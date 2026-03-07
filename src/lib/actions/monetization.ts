"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const MONETIZATION_COOKIE = "monetization-slug";

export async function getOrCreateMonetizationSlug(): Promise<string> {
  const cookieStore = await cookies();
  let slug = cookieStore.get(MONETIZATION_COOKIE)?.value;

  if (!slug) {
    slug = `mono-${Math.random().toString(36).slice(2, 10)}`;
    cookieStore.set(MONETIZATION_COOKIE, slug, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return slug;
}

export async function getMonetizationProfile() {
  const slug = await getOrCreateMonetizationSlug();

  let profile = await db.monetizationProfile.findUnique({
    where: { slug },
    include: {
      products: { orderBy: { order: "asc" } },
      cryptoWallets: { orderBy: { order: "asc" } },
    },
  });

  if (!profile) {
    profile = await db.monetizationProfile.create({
      data: {
        slug,
        displayName: "Your Name",
        bio: "Support my work",
        currency: "USD",
      },
      include: {
        products: { orderBy: { order: "asc" } },
        cryptoWallets: { orderBy: { order: "asc" } },
      },
    });
  }

  return profile;
}

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RESERVED_SLUGS = ["api", "admin", "app", "l", "m", "www"];

const profileSchema = z.object({
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
  currency: z.string().length(3).default("USD"),
});

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  description: z.string().max(500).optional(),
  price: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  type: z.enum(["one-time", "subscription", "tip"]).default("one-time"),
  paymentUrl: z.string().url("Enter a valid payment URL"),
});

export async function updateMonetizationProfile(
  data: z.infer<typeof profileSchema>
) {
  const currentSlug = await getOrCreateMonetizationSlug();
  const parsed = profileSchema.parse(data);

  const updateData: Record<string, unknown> = {};
  if (parsed.displayName !== undefined) updateData.displayName = parsed.displayName;
  if (parsed.bio !== undefined) updateData.bio = parsed.bio;
  if (parsed.avatarUrl !== undefined) updateData.avatarUrl = parsed.avatarUrl || null;
  if (parsed.currency !== undefined) updateData.currency = parsed.currency;

  if (parsed.slug !== undefined && parsed.slug !== currentSlug) {
    const normalizedSlug = parsed.slug.toLowerCase().trim();
    const existing = await db.monetizationProfile.findUnique({
      where: { slug: normalizedSlug },
    });
    if (existing) {
      throw new Error("This link name is already taken");
    }
    updateData.slug = normalizedSlug;

    const cookieStore = await cookies();
    cookieStore.set(MONETIZATION_COOKIE, normalizedSlug, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  await db.monetizationProfile.update({
    where: { slug: currentSlug },
    data: updateData,
  });

  const newSlug = (updateData.slug as string) ?? currentSlug;
  revalidatePath("/app/monetization");
  revalidatePath(`/m/${currentSlug}`);
  revalidatePath(`/m/${newSlug}`);
}

export async function addProduct(data: z.infer<typeof productSchema>) {
  const profile = await getMonetizationProfile();
  const parsed = productSchema.parse(data);

  const maxOrder =
    profile.products.length > 0
      ? Math.max(...profile.products.map((p) => p.order))
      : -1;

  await db.monetizationProduct.create({
    data: {
      profileId: profile.id,
      name: parsed.name,
      description: parsed.description ?? null,
      price: parsed.price,
      currency: parsed.currency,
      type: parsed.type,
      paymentUrl: parsed.paymentUrl,
      order: maxOrder + 1,
    },
  });

  revalidatePath("/app/monetization");
  revalidatePath(`/m/${profile.slug}`);
}

export async function updateProduct(
  id: string,
  data: z.infer<typeof productSchema>
) {
  const parsed = productSchema.parse(data);

  await db.monetizationProduct.update({
    where: { id },
    data: {
      name: parsed.name,
      description: parsed.description ?? null,
      price: parsed.price,
      currency: parsed.currency,
      type: parsed.type,
      paymentUrl: parsed.paymentUrl,
    },
  });

  const profile = await getMonetizationProfile();
  revalidatePath("/app/monetization");
  revalidatePath(`/m/${profile.slug}`);
}

export async function deleteProduct(id: string) {
  await db.monetizationProduct.delete({ where: { id } });

  const profile = await getMonetizationProfile();
  revalidatePath("/app/monetization");
  revalidatePath(`/m/${profile.slug}`);
}

export async function reorderProducts(productIds: string[]) {
  const profile = await getMonetizationProfile();

  await Promise.all(
    productIds.map((id, index) =>
      db.monetizationProduct.update({
        where: { id },
        data: { order: index },
      })
    )
  );

  revalidatePath("/app/monetization");
  revalidatePath(`/m/${profile.slug}`);
}

// Crypto wallets for stablecoin payments
import { CRYPTO_NETWORKS } from "@/constants/crypto";

const cryptoWalletSchema = z.object({
  network: z.enum(CRYPTO_NETWORKS),
  address: z.string().min(10, "Enter a valid wallet address").max(100),
});

export async function addCryptoWallet(data: z.infer<typeof cryptoWalletSchema>) {
  const profile = await getMonetizationProfile();
  const parsed = cryptoWalletSchema.parse(data);

  const maxOrder =
    profile.cryptoWallets.length > 0
      ? Math.max(...profile.cryptoWallets.map((w) => w.order))
      : -1;

  await db.monetizationCryptoWallet.create({
    data: {
      profileId: profile.id,
      network: parsed.network,
      address: parsed.address.trim(),
      order: maxOrder + 1,
    },
  });

  revalidatePath("/app/monetization");
  revalidatePath(`/m/${profile.slug}`);
}

export async function updateCryptoWallet(
  id: string,
  data: z.infer<typeof cryptoWalletSchema>
) {
  const parsed = cryptoWalletSchema.parse(data);

  await db.monetizationCryptoWallet.update({
    where: { id },
    data: {
      network: parsed.network,
      address: parsed.address.trim(),
    },
  });

  const profile = await getMonetizationProfile();
  revalidatePath("/app/monetization");
  revalidatePath(`/m/${profile.slug}`);
}

export async function deleteCryptoWallet(id: string) {
  await db.monetizationCryptoWallet.delete({ where: { id } });

  const profile = await getMonetizationProfile();
  revalidatePath("/app/monetization");
  revalidatePath(`/m/${profile.slug}`);
}
