import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function PublicLinkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const linkInBio = await db.linkInBio.findUnique({
    where: { slug },
    include: {
      links: { orderBy: { order: "asc" } },
    },
  });

  if (!linkInBio) {
    notFound();
  }

  const bgColor = linkInBio.backgroundColor || "#0a0a0a";
  const buttonColor = linkInBio.buttonColor || "#ffffff";
  const buttonTextColor = linkInBio.buttonTextColor || "#0a0a0a";

  return (
    <div
      className="min-h-screen px-4 py-12"
      style={{ backgroundColor: bgColor }}
    >
      <div className="mx-auto max-w-md">
        {/* Profile */}
        <div className="mb-8 flex flex-col items-center text-center">
          {linkInBio.avatarUrl ? (
            <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
              <Image
                src={linkInBio.avatarUrl}
                alt={linkInBio.displayName || "Avatar"}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          ) : (
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-3xl font-bold text-white">
              {(linkInBio.displayName || "?")[0]}
            </div>
          )}
          <h1 className="text-xl font-semibold text-white">
            {linkInBio.displayName || "Your Name"}
          </h1>
          {linkInBio.bio && (
            <p className="mt-2 text-sm text-white/80">{linkInBio.bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {linkInBio.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl px-4 py-3 text-center font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: buttonColor,
                color: buttonTextColor,
              }}
            >
              {link.title}
            </a>
          ))}
        </div>

        {linkInBio.links.length === 0 && (
          <p className="py-8 text-center text-sm text-white/50">
            No links yet.
          </p>
        )}
      </div>
    </div>
  );
}
