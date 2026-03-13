"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const applySchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  socials: z
    .object({
      instagram: z.string().url().optional().or(z.literal("")),
      tiktok: z.string().url().optional().or(z.literal("")),
      youtube: z.string().url().optional().or(z.literal("")),
      website: z.string().url().optional().or(z.literal("")),
    })
    .partial()
    .optional(),
  goal: z.string().min(10).max(1000).optional().or(z.literal("")),
  brandStage: z.string().max(200).optional().or(z.literal("")),
});

const submitSchema = z.object({
  type: z.enum(["link", "text"]),
  content: z.string().min(3).max(4000),
});

async function getSessionOrThrow() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function isAdmin() {
  const session = await getSessionOrThrow();
  const role = await db.authUserRole.findUnique({
    where: { authUserId: session.user.id },
  });
  return role?.role === "admin";
}

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Forbidden");
}

async function ensureDefaultTemplates() {
  const existing = await db.agencyTaskTemplate.count();
  if (existing > 0) return;

  await db.agencyTaskTemplate.createMany({
    data: [
      {
        order: 0,
        title: "Define your brand + offer",
        description:
          "Share your niche, target audience, and a clear offer (what you sell and who it helps).",
        required: true,
        isActive: true,
      },
      {
        order: 1,
        title: "Submit a 7-day content plan",
        description:
          "Provide 7 post ideas + hooks. Include platforms you’ll post on and what you’re optimizing for (sales, leads, subscribers).",
        required: true,
        isActive: true,
      },
      {
        order: 2,
        title: "Ship a landing page",
        description:
          "Share a live URL with your offer, proof, and a clear CTA (waitlist, purchase, or consult).",
        required: true,
        isActive: true,
      },
      {
        order: 3,
        title: "Pick your AI/SaaS idea",
        description:
          "Describe the product you want to build, who it’s for, and the smallest MVP you can ship in 2–3 weeks.",
        required: true,
        isActive: true,
      },
      {
        order: 4,
        title: "Record a short demo",
        description:
          "Submit a link to a 1–3 minute video showing your landing page and explaining your AI/SaaS direction.",
        required: true,
        isActive: true,
      },
    ],
  });
}

export async function createAgencyApplication(input: z.input<typeof applySchema>) {
  const data = applySchema.parse(input);
  const email = data.email.toLowerCase().trim();
  const socialsJson = data.socials ? JSON.stringify(data.socials) : null;

  // Allow multiple applications by email over time if you want; for v1, keep latest per email if not claimed.
  const existing = await db.agencyApplication.findFirst({
    where: { email, claimedAuthUserId: null },
    orderBy: { createdAt: "desc" },
  });

  if (existing) {
    await db.agencyApplication.update({
      where: { id: existing.id },
      data: {
        name: data.name,
        socials: socialsJson ?? undefined,
        goal: data.goal?.trim() || null,
        brandStage: data.brandStage?.trim() || null,
        status: "applied",
      },
    });
    revalidatePath("/agency-program");
    return { id: existing.id };
  }

  const created = await db.agencyApplication.create({
    data: {
      name: data.name,
      email,
      socials: socialsJson,
      goal: data.goal?.trim() || null,
      brandStage: data.brandStage?.trim() || null,
      status: "applied",
    },
  });

  revalidatePath("/agency-program");
  return { id: created.id };
}

export async function getMyAgencyProgram() {
  const session = await getSessionOrThrow();
  const email = session.user.email?.toLowerCase().trim();
  if (!email) throw new Error("Missing email on account");

  // Prefer already-claimed application.
  let application = await db.agencyApplication.findFirst({
    where: {
      OR: [{ claimedAuthUserId: session.user.id }, { email }],
    },
    orderBy: { createdAt: "desc" },
    include: {
      taskAssignments: {
        orderBy: { createdAt: "asc" },
        include: {
          template: true,
          submissions: { orderBy: { createdAt: "desc" }, take: 1 },
        },
      },
      entitlements: true,
    },
  });

  if (!application) return null;

  // Auto-claim if unclaimed and emails match.
  if (!application.claimedAuthUserId) {
    application = await db.agencyApplication.update({
      where: { id: application.id },
      data: { claimedAuthUserId: session.user.id },
      include: {
        taskAssignments: {
          orderBy: { createdAt: "asc" },
          include: {
            template: true,
            submissions: { orderBy: { createdAt: "desc" }, take: 1 },
          },
        },
        entitlements: true,
      },
    });
  }

  return application;
}

export async function submitAgencyTask(assignmentId: string, input: z.input<typeof submitSchema>) {
  const session = await getSessionOrThrow();
  const data = submitSchema.parse(input);

  const assignment = await db.agencyTaskAssignment.findUnique({
    where: { id: assignmentId },
    include: { application: true },
  });
  if (!assignment) throw new Error("Task not found");
  if (assignment.application.claimedAuthUserId !== session.user.id) {
    throw new Error("Forbidden");
  }

  await db.agencyTaskSubmission.create({
    data: {
      assignmentId,
      type: data.type,
      content: data.content.trim(),
      status: "submitted",
    },
  });

  await db.agencyTaskAssignment.update({
    where: { id: assignmentId },
    data: { status: "submitted" },
  });

  revalidatePath("/app/agency-program");
}

// --- Admin ---

export async function adminListAgencyApplications() {
  await requireAdmin();
  return db.agencyApplication.findMany({
    orderBy: { updatedAt: "desc" },
    take: 200,
  });
}

export async function adminGetAgencyApplication(id: string) {
  await requireAdmin();
  return db.agencyApplication.findUnique({
    where: { id },
    include: {
      taskAssignments: {
        orderBy: { createdAt: "asc" },
        include: {
          template: true,
          submissions: { orderBy: { createdAt: "desc" }, take: 5 },
        },
      },
      entitlements: true,
    },
  });
}

export async function adminUpdateAgencyStatus(id: string, status: "applied" | "in_review" | "accepted" | "rejected") {
  await requireAdmin();

  if (status === "accepted") {
    await ensureDefaultTemplates();
  }

  const updated = await db.agencyApplication.update({
    where: { id },
    data: {
      status,
      acceptedAt: status === "accepted" ? new Date() : undefined,
    },
  });

  if (status === "accepted") {
    const templates = await db.agencyTaskTemplate.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    for (const t of templates) {
      await db.agencyTaskAssignment.upsert({
        where: { applicationId_templateId: { applicationId: id, templateId: t.id } },
        update: {},
        create: {
          applicationId: id,
          templateId: t.id,
          status: "pending",
        },
      });
    }
  }

  revalidatePath("/app/admin/agency");
  revalidatePath(`/app/admin/agency/${id}`);
  return updated;
}

export async function adminReviewSubmission(submissionId: string, decision: "approved" | "needs_changes", reviewerNotes?: string) {
  await requireAdmin();

  const submission = await db.agencyTaskSubmission.findUnique({
    where: { id: submissionId },
    include: {
      assignment: {
        include: { template: true, application: true },
      },
    },
  });
  if (!submission) throw new Error("Submission not found");

  await db.agencyTaskSubmission.update({
    where: { id: submissionId },
    data: {
      status: decision,
      reviewerNotes: reviewerNotes?.trim() || null,
    },
  });

  await db.agencyTaskAssignment.update({
    where: { id: submission.assignmentId },
    data: { status: decision === "approved" ? "approved" : "needs_changes" },
  });

  // If everything required is approved, mark completed + entitlements.
  const appId = submission.assignment.applicationId;
  const assignments = await db.agencyTaskAssignment.findMany({
    where: { applicationId: appId },
    include: { template: true },
  });
  const required = assignments.filter((a) => a.template.required);
  const allApproved = required.length > 0 && required.every((a) => a.status === "approved");

  if (allApproved) {
    await db.agencyApplication.update({
      where: { id: appId },
      data: { status: "completed", completedAt: new Date() },
    });

    await db.agencyEntitlement.upsert({
      where: { applicationId_type: { applicationId: appId, type: "brand_scaling" } },
      update: {
        active: true,
        metadata: JSON.stringify({
          label: "Opportunity to scale your brand with our expert team",
        }),
      },
      create: {
        applicationId: appId,
        type: "brand_scaling",
        active: true,
        metadata: JSON.stringify({
          label: "Opportunity to scale your brand with our expert team",
        }),
      },
    });

    await db.agencyEntitlement.upsert({
      where: { applicationId_type: { applicationId: appId, type: "ai_saas_build" } },
      update: {
        active: true,
        metadata: JSON.stringify({
          label: "Opportunity to build your own AI company / SaaS business",
        }),
      },
      create: {
        applicationId: appId,
        type: "ai_saas_build",
        active: true,
        metadata: JSON.stringify({
          label: "Opportunity to build your own AI company / SaaS business",
        }),
      },
    });
  }

  revalidatePath("/app/admin/agency");
  revalidatePath(`/app/admin/agency/${appId}`);
}

