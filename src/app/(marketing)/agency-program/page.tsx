import { Container, Wrapper } from "@/components";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";

const AgencyHeroCtas = dynamic(
  () =>
    import("@/components/agency-program/agency-hero-ctas").then(
      (m) => m.AgencyHeroCtas,
    ),
  { ssr: false }
);

export default function AgencyProgramPage() {
  return (
    <Wrapper className="py-20 md:py-24 min-h-screen">
      <Container className="max-w-5xl mx-auto">
        {/* Hero / intro */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
              Creator Agency Program
            </p>
            <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-5xl">
              Scale your brand — and build your own AI/SaaS business.
            </h1>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              Apply to join our rolling program. If accepted, you’ll complete a set of tasks
              with guidance from our team. Once completed, you unlock benefits and opportunities
              to grow your brand and build your own tech company.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <AgencyHeroCtas />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
            <h2 className="text-lg font-medium">What you get</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">Brand scaling support</span>{" "}
                with our expert team: positioning, offer, landing page, content strategy.
              </li>
              <li>
                <span className="text-foreground font-medium">A path to your own tech business</span>{" "}
                — build an AI company or SaaS business with an MVP plan and execution support.
              </li>
              <li>
                <span className="text-foreground font-medium">Clear tasks</span>{" "}
                with feedback and approvals so you know exactly what “done” looks like.
              </li>
            </ul>

            <div className="mt-8 grid gap-3">
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  How it works
                </p>
                <ol className="mt-2 list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Apply</li>
                  <li>Manual review</li>
                  <li>Accepted creators complete tasks + submit work</li>
                  <li>Graduate → benefits unlock</li>
                </ol>
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Rolling admissions
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  You can apply anytime. If accepted, you’ll see your tasks inside your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who it's for */}
        <section className="mt-14 grid gap-6 rounded-2xl border border-border bg-card/40 p-6 md:mt-20 md:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Who this is for
            </p>
            <h2 className="mt-2 text-xl font-semibold md:text-2xl">
              Creators who want to turn attention into real products and businesses.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                01 • Brand builders
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                You have an audience (or momentum) and want a sharper brand, offer, and funnel.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                02 • Product thinkers
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                You&apos;re sitting on ideas for tools, AI products, or SaaS and need a path to MVP.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                03 • System builders
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                You want repeatable systems for content, launches, and revenue—not one-off wins.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </Wrapper>
  );
}

