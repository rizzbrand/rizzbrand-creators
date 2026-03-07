"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const LINK_IN_BIO_COOKIE = "link-in-bio-slug";

export async function getOrCreateLinkInBioSlug(): Promise<string> {
  const cookieStore = await cookies();
  let slug = cookieStore.get(LINK_IN_BIO_COOKIE)?.value;

  if (!slug) {
    slug = `bio-${Math.random().toString(36).slice(2, 10)}`;
    cookieStore.set(LINK_IN_BIO_COOKIE, slug, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return slug;
}

export async function getLinkInBio() {
  const slug = await getOrCreateLinkInBioSlug();

  let linkInBio = await db.linkInBio.findUnique({
    where: { slug },
    include: {
      links: { orderBy: { order: "asc" } },
    },
  });

  if (!linkInBio) {
    linkInBio = await db.linkInBio.create({
      data: {
        slug,
        displayName: "Your Name",
        bio: "Add a short bio here",
      },
      include: {
        links: { orderBy: { order: "asc" } },
      },
    });
  }

  return linkInBio;
}

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RESERVED_SLUGS = ["api", "admin", "app", "l", "m", "www"];

const linkInBioSchema = z.object({
  slug: z
    .string()
    .min(3, "At least 3 characters")
    .max(30, "Max 30 characters")
    .regex(SLUG_REGEX, "Use lowercase letters, numbers, and hyphens only")
    .refine((s) => !RESERVED_SLUGS.includes(s), "This name is reserved")
    .optional(),
  displayName: z.string().max(50).optional(),
  bio: z.string().max(200).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  theme: z.enum(["default", "minimal", "gradient"]).default("default"),
  backgroundColor: z.string().optional(),
  buttonColor: z.string().optional(),
  buttonTextColor: z.string().optional(),
});

const linkSchema = z.object({
  title: z.string().min(1, "Title is required").max(50),
  url: z.string().url("Enter a valid URL"),
});

export async function updateLinkInBio(data: z.infer<typeof linkInBioSchema>) {
  const currentSlug = await getOrCreateLinkInBioSlug();
  const parsed = linkInBioSchema.parse(data);

  const updateData: Record<string, unknown> = {};
  if (parsed.displayName !== undefined) updateData.displayName = parsed.displayName;
  if (parsed.bio !== undefined) updateData.bio = parsed.bio;
  if (parsed.avatarUrl !== undefined) updateData.avatarUrl = parsed.avatarUrl || null;
  if (parsed.theme !== undefined) updateData.theme = parsed.theme;
  if (parsed.backgroundColor !== undefined) updateData.backgroundColor = parsed.backgroundColor;
  if (parsed.buttonColor !== undefined) updateData.buttonColor = parsed.buttonColor;
  if (parsed.buttonTextColor !== undefined) updateData.buttonTextColor = parsed.buttonTextColor;

  if (parsed.slug !== undefined && parsed.slug !== currentSlug) {
    const normalizedSlug = parsed.slug.toLowerCase().trim();
    const existing = await db.linkInBio.findUnique({ where: { slug: normalizedSlug } });
    if (existing) {
      throw new Error("This link name is already taken");
    }
    updateData.slug = normalizedSlug;

    const cookieStore = await cookies();
    cookieStore.set(LINK_IN_BIO_COOKIE, normalizedSlug, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  await db.linkInBio.update({
    where: { slug: currentSlug },
    data: updateData,
  });

  const newSlug = (updateData.slug as string) ?? currentSlug;
  revalidatePath("/app/link-in-bio");
  revalidatePath(`/l/${currentSlug}`);
  revalidatePath(`/l/${newSlug}`);
}

export async function addLink(data: z.infer<typeof linkSchema>) {
  const linkInBio = await getLinkInBio();
  const parsed = linkSchema.parse(data);

  const maxOrder =
    linkInBio.links.length > 0
      ? Math.max(...linkInBio.links.map((l) => l.order))
      : -1;

  await db.linkInBioLink.create({
    data: {
      linkInBioId: linkInBio.id,
      title: parsed.title,
      url: parsed.url,
      order: maxOrder + 1,
    },
  });

  revalidatePath("/app/link-in-bio");
  revalidatePath(`/l/${linkInBio.slug}`);
}

export async function updateLink(
  id: string,
  data: z.infer<typeof linkSchema>
) {
  const parsed = linkSchema.parse(data);

  await db.linkInBioLink.update({
    where: { id },
    data: {
      title: parsed.title,
      url: parsed.url,
    },
  });

  const linkInBio = await getLinkInBio();
  revalidatePath("/app/link-in-bio");
  revalidatePath(`/l/${linkInBio.slug}`);
}

export async function deleteLink(id: string) {
  await db.linkInBioLink.delete({ where: { id } });

  const linkInBio = await getLinkInBio();
  revalidatePath("/app/link-in-bio");
  revalidatePath(`/l/${linkInBio.slug}`);
}

export async function reorderLinks(linkIds: string[]) {
  const linkInBio = await getLinkInBio();

  await Promise.all(
    linkIds.map((id, index) =>
      db.linkInBioLink.update({
        where: { id },
        data: { order: index },
      })
    )
  );

  revalidatePath("/app/link-in-bio");
  revalidatePath(`/l/${linkInBio.slug}`);
}
