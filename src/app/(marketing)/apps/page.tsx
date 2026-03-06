"use client";

import { Background, Container, Footer, Navbar, Wrapper } from "@/components";
import { ECOSYSTEM_APPS, type EcosystemApp } from "@/constants/apps";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function AppStoreCard({ app }: { app: EcosystemApp }) {
  const isExternal = app.href.startsWith("http");
  const hrefProps = isExternal
    ? { href: app.href, target: "_blank", rel: "noopener noreferrer" as const }
    : { href: app.href };

  return (
    <a
      {...hrefProps}
      className="group relative block overflow-hidden rounded-[32px] border border-white/10 bg-neutral-950/90 text-left shadow-[0_18px_45px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      {/* Hero image area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
          <Image
            src={app.icon}
            alt={app.name}
            fill
            className="object-cover"
          sizes="640px"
          />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Bottom info strip, like App Store */}
      <div className="flex items-center gap-3 border-t border-white/10 bg-neutral-950/95 px-4 py-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 flex-shrink-0">
          <Image
            src={app.icon}
            alt={app.name}
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-white truncate">{app.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">{app.tagline}</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-full bg-white text-[11px] px-3 py-1 font-semibold text-black shadow-sm group-hover:bg-slate-100 transition-colors"
        >
          VIEW
        </button>
      </div>
    </a>
  );
}

function AppListCard({ app }: { app: EcosystemApp }) {
  const isExternal = app.href.startsWith("http");
  const className =
    "group flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-200 text-left";

  const content = (
    <>
      <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 flex-shrink-0">
        <Image
          src={app.icon}
          alt={app.name}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
          {app.category}
        </span>
        <h3 className="font-semibold text-foreground mt-0.5 truncate">{app.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{app.tagline}</p>
      </div>
      <span className="flex items-center gap-1 text-xs font-semibold text-primary flex-shrink-0">
        {isExternal ? "OPEN" : "VIEW"}
        <ArrowUpRight className="w-3 h-3" />
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a href={app.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={app.href} className={className}>
      {content}
    </Link>
  );
}

export default function AppsPage() {
  const highlightApps = ECOSYSTEM_APPS;
  const rest = ECOSYSTEM_APPS;

  return (
    <Background>
      <Navbar />
      <Wrapper className="py-16 md:py-24 min-h-screen">
        <Container className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.25em] mb-3">
              App ecosystem
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-semibold text-foreground tracking-tight">
              Apps we build for creators
            </h1>
            <p className="mt-4 text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              A gallery of products from our studio — designed to feel like a home screen for
              everything we ship.
            </p>
          </div>
        </Container>

        {/* App Store–style marquee carousel (full-width) */}
        <section className="mb-16 relative left-1/2 right-1/2 w-screen -ml-[50vw]">
          <div className="overflow-hidden px-4 md:px-12">
            <div className="flex gap-6 md:gap-8 w-max animate-marquee-infinite [--duration:40s]">
              {[...highlightApps, ...highlightApps].map((app, index) => (
                <div
                  key={`${app.id}-${index}`}
                  className="w-[280px] sm:w-[340px] md:w-[420px] flex-shrink-0"
                >
                  <AppStoreCard app={app} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Container className="max-w-5xl mx-auto">
          {/* All apps list */}
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              All apps
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {rest.map((app) => (
                <AppListCard key={app.id} app={app} />
              ))}
            </div>
          </section>

          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/work-with-us">Build your app with us</Link>
            </Button>
          </div>
        </Container>
      </Wrapper>
      <Footer />
    </Background>
  );
}
