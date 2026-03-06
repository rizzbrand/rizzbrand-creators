import { Background, Container, CTA, Footer, Navbar, Wrapper } from "@/components";
import { SectionBadge } from "@/components/ui/section-bade";

const AIAutomationPage = () => {
  return (
    <Background>
      <Wrapper className="py-20 lg:py-24">
        <Navbar />
        <main className="mt-10 md:mt-16">
          <Container className="max-w-4xl mx-auto">
            <SectionBadge title="Services" />
            <h1 className="mt-6 text-3xl md:text-5xl font-heading font-semibold !leading-tight">
              AI automation for content, workflows &amp; operations
            </h1>
            <p className="mt-4 text-base md:text-lg text-accent-foreground/70">
              Turn repetitive tasks into automated systems. We design and implement AI workflows that help you and
              your team move faster with fewer manual touchpoints.
            </p>
          </Container>

          <Container className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Content &amp; asset generation</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                From first draft scripts to caption suggestions, we build AI assist tooling around how you already
                create.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Workflow automation</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Connect tools, CRMs, and analytics so handoffs happen automatically instead of living in your DMs.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Custom AI copilots</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Build brand‑specific assistants for your team or community that understand your offers and voice.
              </p>
            </div>
          </Container>

          <Container className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold">
                Built on real creator workflows, not demos
              </h2>
              <p className="mt-4 text-sm md:text-base text-muted-foreground">
                We start by mapping what you and your team do every week — publishing, outreach, brand deals,
                product ops — then identify where AI can safely take over or assist.
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                Our goal is to remove bottlenecks, not add another tool your team has to remember to use.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-6">
              <h3 className="text-base font-semibold font-heading">Best for</h3>
              <ul className="mt-3 space-y-2 text-sm md:text-base text-muted-foreground">
                <li>Creators with teams juggling many moving pieces</li>
                <li>Brands running multi‑channel campaigns every month</li>
                <li>Operators who want clean, measurable systems</li>
              </ul>
            </div>
          </Container>

          <CTA />
        </main>
        <Footer />
      </Wrapper>
    </Background>
  );
};

export default AIAutomationPage;

