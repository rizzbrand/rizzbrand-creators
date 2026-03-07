import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CRYPTO_NETWORK_LABELS, CRYPTO_NETWORK_COINS } from "@/constants/crypto";
import CryptoCopyButton from "./crypto-copy-button";

export default async function PublicMonetizationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const profile = await db.monetizationProfile.findUnique({
    where: { slug },
    include: {
      products: { orderBy: { order: "asc" } },
      cryptoWallets: { orderBy: { order: "asc" } },
    },
  });

  if (!profile) {
    notFound();
  }

  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price);

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12">
      <div className="mx-auto max-w-md">
        {/* Profile */}
        <div className="mb-8 flex flex-col items-center text-center">
          {profile.avatarUrl ? (
            <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
              <Image
                src={profile.avatarUrl}
                alt={profile.displayName || "Avatar"}
                fill
                className="object-cover"
                sizes="96px"
                unoptimized
              />
            </div>
          ) : (
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-3xl font-bold text-white">
              <span>💰</span>
            </div>
          )}
          <h1 className="text-xl font-semibold text-white">
            {profile.displayName || "Support"}
          </h1>
          {profile.bio && (
            <p className="mt-2 text-sm text-white/80">{profile.bio}</p>
          )}
        </div>

        {/* Crypto wallets */}
        {profile.cryptoWallets.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-white/60">
              Pay with crypto (stablecoins)
            </h2>
            <div className="space-y-3">
              {profile.cryptoWallets.map((wallet) => {
                const network = wallet.network as keyof typeof CRYPTO_NETWORK_LABELS;
                const coins = CRYPTO_NETWORK_COINS[network] || [];
                return (
                  <div
                    key={wallet.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-white">
                        {CRYPTO_NETWORK_LABELS[network] || wallet.network}
                      </p>
                      <p className="text-xs text-white/60">
                        {coins.join(", ")}
                      </p>
                      <p className="mt-1 truncate font-mono text-sm text-white/80" title={wallet.address}>
                        {wallet.address.slice(0, 12)}...{wallet.address.slice(-8)}
                      </p>
                    </div>
                    <CryptoCopyButton address={wallet.address} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Products */}
        <div className="space-y-3">
          {profile.products.map((product) => (
            <a
              key={product.id}
              href={product.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="font-medium text-white">{product.name}</p>
                  {product.description && (
                    <p className="mt-0.5 text-sm text-white/70 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <p className="mt-2 text-sm font-semibold text-emerald-400">
                    {formatPrice(product.price, product.currency)}
                    {product.type !== "one-time" && (
                      <span className="font-normal text-white/60">
                        {" "}
                        / {product.type}
                      </span>
                    )}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
                  Pay
                </span>
              </div>
            </a>
          ))}
        </div>

        {profile.products.length === 0 && profile.cryptoWallets.length === 0 && (
          <p className="py-8 text-center text-sm text-white/50">
            No products or wallets yet.
          </p>
        )}
      </div>
    </div>
  );
}
