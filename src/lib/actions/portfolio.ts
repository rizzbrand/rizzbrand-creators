"use server";

// import { currentUser } from "@clerk/nextjs/server";  // Clerk removed
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Portfolio Schema
const portfolioSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  theme: z.string().default("default"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  customDomain: z.string().optional(),
  isPublished: z.boolean().default(false),
});

// Project Schema
const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  images: z.array(z.string().url()).default([]),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured: z.boolean().default(false),
  client: z.string().optional(),
  year: z.number().optional(),
  category: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  caseStudyUrl: z.string().url().optional().or(z.literal("")),
});

// Skill Schema
const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().optional(),
  level: z.number().min(0).max(100).default(50),
  icon: z.string().optional(),
  isVisible: z.boolean().default(true),
});

// Social Link Schema
const socialLinkSchema = z.object({
  platform: z.enum([
    "instagram",
    "twitter",
    "youtube",
    "tiktok",
    "linkedin",
    "github",
    "behance",
    "dribbble",
    "website",
    "other",
  ]),
  url: z.string().url(),
  label: z.string().optional(),
  icon: z.string().optional(),
  isVisible: z.boolean().default(true),
});

// Get or create user — Clerk removed; sign in / sign up commented out.
// Always throws until auth is re-enabled; return type is for TS only.
async function getOrCreateUser(): Promise<{ id: string; name?: string | null }> {
  throw new Error("Unauthorized — sign in / sign up are currently disabled.");
}

// Get or create portfolio
export async function getOrCreatePortfolio() {
  try {
    const dbUser = await getOrCreateUser();

    let portfolio = await db.portfolio.findUnique({
      where: { userId: dbUser.id },
      include: {
        projects: {
          orderBy: { order: "asc" },
        },
        skills: {
          orderBy: { order: "asc" },
        },
        socialLinks: {
          orderBy: { order: "asc" },
        },
        experiences: {
          orderBy: { order: "asc" },
        },
        testimonials: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!portfolio) {
      const slug = `${dbUser.name?.toLowerCase().replace(/\s+/g, "-") || "portfolio"}-${dbUser.id.slice(0, 8)}`;
      
      portfolio = await db.portfolio.create({
        data: {
          userId: dbUser.id,
          slug: slug,
          title: `${dbUser.name || "My"} Portfolio`,
        },
        include: {
          projects: true,
          skills: true,
          socialLinks: true,
          experiences: true,
          testimonials: true,
        },
      });
    }

    return portfolio;
  } catch (error) {
    console.error("Error getting portfolio:", error);
    throw error;
  }
}

// Update portfolio
export async function updatePortfolio(data: z.infer<typeof portfolioSchema>) {
  try {
    const dbUser = await getOrCreateUser();
    const validated = portfolioSchema.parse(data);

    const portfolio = await db.portfolio.update({
      where: { userId: dbUser.id },
      data: validated,
    });

    revalidatePath("/app");
    return portfolio;
  } catch (error) {
    console.error("Error updating portfolio:", error);
    throw error;
  }
}

// Create project
export async function createProject(data: z.infer<typeof projectSchema>) {
  try {
    const dbUser = await getOrCreateUser();
    const validated = projectSchema.parse(data);

    const portfolio = await db.portfolio.findUnique({
      where: { userId: dbUser.id },
    });

    if (!portfolio) throw new Error("Portfolio not found");

    const slug = validated.title.toLowerCase().replace(/\s+/g, "-");
    const existingProjects = await db.project.count({
      where: { portfolioId: portfolio.id },
    });

    const project = await db.project.create({
      data: {
        ...validated,
        portfolioId: portfolio.id,
        slug: `${slug}-${Date.now()}`,
        order: existingProjects,
      },
    });

    revalidatePath("/app/projects");
    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// Update project
export async function updateProject(
  projectId: string,
  data: Partial<z.infer<typeof projectSchema>>
) {
  try {
    const dbUser = await getOrCreateUser();
    const validated = projectSchema.partial().parse(data);

    const portfolio = await db.portfolio.findUnique({
      where: { userId: dbUser.id },
    });

    if (!portfolio) throw new Error("Portfolio not found");

    const project = await db.project.update({
      where: { id: projectId },
      data: validated,
    });

    revalidatePath("/app/projects");
    return project;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

// Delete project
export async function deleteProject(projectId: string) {
  try {
    const dbUser = await getOrCreateUser();

    const portfolio = await db.portfolio.findUnique({
      where: { userId: dbUser.id },
    });

    if (!portfolio) throw new Error("Portfolio not found");

    await db.project.delete({
      where: { id: projectId },
    });

    revalidatePath("/app/projects");
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

// Create skill
export async function createSkill(data: z.infer<typeof skillSchema>) {
  try {
    const dbUser = await getOrCreateUser();
    const validated = skillSchema.parse(data);

    const portfolio = await db.portfolio.findUnique({
      where: { userId: dbUser.id },
    });

    if (!portfolio) throw new Error("Portfolio not found");

    const existingSkills = await db.skill.count({
      where: { portfolioId: portfolio.id },
    });

    const skill = await db.skill.create({
      data: {
        ...validated,
        portfolioId: portfolio.id,
        order: existingSkills,
      },
    });

    revalidatePath("/app/skills");
    return skill;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
}

// Update skill
export async function updateSkill(
  skillId: string,
  data: Partial<z.infer<typeof skillSchema>>
) {
  try {
    const dbUser = await getOrCreateUser();
    const validated = skillSchema.partial().parse(data);

    const portfolio = await db.portfolio.findUnique({
      where: { userId: dbUser.id },
    });

    if (!portfolio) throw new Error("Portfolio not found");

    const skill = await db.skill.update({
      where: { id: skillId },
      data: validated,
    });

    revalidatePath("/app/skills");
    return skill;
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
}

// Delete skill
export async function deleteSkill(skillId: string) {
  try {
    const dbUser = await getOrCreateUser();

    const portfolio = await db.portfolio.findUnique({
      where: { userId: dbUser.id },
    });

    if (!portfolio) throw new Error("Portfolio not found");

    await db.skill.delete({
      where: { id: skillId },
    });

    revalidatePath("/app/skills");
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
}

// Create social link
export async function createSocialLink(data: z.infer<typeof socialLinkSchema>) {
  try {
    const dbUser = await getOrCreateUser();
    const validated = socialLinkSchema.parse(data);

    const portfolio = await db.portfolio.findUnique({
      where: { userId: dbUser.id },
    });

    if (!portfolio) throw new Error("Portfolio not found");

    const existingLinks = await db.socialLink.count({
      where: { portfolioId: portfolio.id },
    });

    const link = await db.socialLink.create({
      data: {
        ...validated,
        portfolioId: portfolio.id,
        order: existingLinks,
      },
    });

    revalidatePath("/app/links");
    return link;
  } catch (error) {
    console.error("Error creating social link:", error);
    throw error;
  }
}

// Update social link
export async function updateSocialLink(
  linkId: string,
  data: Partial<z.infer<typeof socialLinkSchema>>
) {
  try {
    const dbUser = await getOrCreateUser();
    const validated = socialLinkSchema.partial().parse(data);

    const portfolio = await db.portfolio.findUnique({
      where: { userId: dbUser.id },
    });

    if (!portfolio) throw new Error("Portfolio not found");

    const link = await db.socialLink.update({
      where: { id: linkId },
      data: validated,
    });

    revalidatePath("/app/links");
    return link;
  } catch (error) {
    console.error("Error updating social link:", error);
    throw error;
  }
}

// Delete social link
export async function deleteSocialLink(linkId: string) {
  try {
    const dbUser = await getOrCreateUser();

    const portfolio = await db.portfolio.findUnique({
      where: { userId: dbUser.id },
    });

    if (!portfolio) throw new Error("Portfolio not found");

    await db.socialLink.delete({
      where: { id: linkId },
    });

    revalidatePath("/app/links");
  } catch (error) {
    console.error("Error deleting social link:", error);
    throw error;
  }
}

