"use client";

import { Container, Wrapper } from "@/components";
import {
  CREATOR_TOOL_CATEGORIES,
  OUR_CREATOR_TOOLS,
  type CreatorTool,
} from "@/constants/creator-tools";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";

function ToolIcon({ tool, size = "lg" }: { tool: CreatorTool; size?: "sm" | "lg" }) {
  if (tool.icon) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={tool.icon}
          alt={tool.name}
          fill
          className="object-contain"
          sizes={size === "sm" ? "36px" : "96px"}
          priority={tool.id === "link-in-bio"}
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center font-bold text-white/90"
      style={{
        backgroundColor: tool.accentColor,
        fontSize: size === "sm" ? "0.875rem" : "1.5rem",
      }}
    >
      {tool.name.charAt(0)}
    </div>
  );
}

function ToolCard({ tool }: { tool: CreatorTool }) {
  const isExternal = tool.href.startsWith("http");
  const className =
    "group relative block overflow-hidden rounded-[28px] border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md";

  const content = (
    <>
      <div
        className="relative aspect-[4/3] w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${tool.accentColor}30 0%, ${tool.accentColor}10 50%, transparent 100%)`,
        }}
      >
        {tool.icon ? (
          <Image
            src={tool.icon}
            alt={tool.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority={tool.id === "link-in-bio"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative h-24 w-24 overflow-hidden rounded-[22px] shadow-xl">
              <ToolIcon tool={tool} />
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="flex items-center gap-3 border-t border-border bg-card/95 px-4 py-3">
        <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-2xl">
          <ToolIcon tool={tool} size="sm" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium truncate">{tool.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">
            {tool.tagline}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {isExternal ? (
            <>
              OPEN
              <ExternalLink className="h-3 w-3" />
            </>
          ) : (
            "OPEN"
          )}
        </span>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={tool.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }
  return <Link href={tool.href} className={className}>{content}</Link>;
}

function ToolListCard({ tool }: { tool: CreatorTool }) {
  const isExternal = tool.href.startsWith("http");
  const className =
    "group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/50 hover:bg-card transition-all duration-200 text-left";

  const content = (
    <>
      <div
        className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl"
        style={{ backgroundColor: tool.accentColor }}
      >
        <ToolIcon tool={tool} />
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
          {tool.category}
        </span>
        <h3 className="mt-0.5 font-semibold truncate">{tool.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
          {tool.tagline}
        </p>
      </div>
      <span className="flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-primary">
        {isExternal ? "OPEN" : "OPEN"}
        <ArrowUpRight className="h-3 w-3" />
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={tool.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={tool.href} className={className}>
      {content}
    </Link>
  );
}

export default function CreatorToolsAppPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allTools = OUR_CREATOR_TOOLS;
  const filteredTools = selectedCategory
    ? allTools.filter((t) => t.category === selectedCategory)
    : allTools;

  return (
    <Wrapper className="min-h-screen py-8 md:py-12">
      <Container className="mx-auto max-w-5xl">
        <div className="mb-8 md:mb-12">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-4xl">
            Creator Tools
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            Tools to grow and run your creator business. Build your link in bio,
            track analytics, schedule content, and more.
          </p>
        </div>

        {/* Our tools — built by Rizzbrand */}
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Our tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OUR_CREATOR_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Category pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            All
          </button>
          {CREATOR_TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* All tools */}
        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {selectedCategory ? selectedCategory : "All tools"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredTools.map((tool) => (
              <ToolListCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </Container>
    </Wrapper>
  );
}
