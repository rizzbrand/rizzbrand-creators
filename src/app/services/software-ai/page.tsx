import { Background, Container, CTA, Footer, Navbar, Wrapper } from "@/components";
import { SectionBadge } from "@/components/ui/section-bade";

const SoftwareAIPage = () => {
  return (
    <Background>
      <Wrapper className="py-20 lg:py-24">
        <Navbar />
        <main className="mt-10 md:mt-16">
          <Container className="max-w-4xl mx-auto">
            <SectionBadge title="Services" />
            <h1 className="mt-6 text-3xl md:text-5xl font-heading font-semibold !leading-tight">
              Software &amp; AI products built around your brand
            </h1>
            <p className="mt-4 text-base md:text-lg text-accent-foreground/70">
              We help you design, build, and launch custom software and AI experiences that extend your brand
              beyond content — from internal tools to audience‑facing products.
            </p>
          </Container>

          <Container className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Custom internal tools</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Dashboards, CRM‑style views, and workflow tools tailored to how your team actually operates.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Audience‑facing apps</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Calculators, planners, communities, or niche utilities that give your audience more reasons to stay
                close to your brand.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">AI‑powered experiences</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                From fine‑tuned assistants to recommendation systems, we embed AI where it meaningfully improves the
                user experience.
              </p>
            </div>
          </Container>

          <Container className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold">
                From idea to software users actually love
              </h2>
              <p className="mt-4 text-sm md:text-base text-muted-foreground">
                We validate the problem, map the core journeys, and scope a first version that&apos;s realistic to
                ship — then partner with you on the roadmap as usage grows.
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                Our lens is always: does this product deepen the relationship with your audience, or make your team
                meaningfully more effective?
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-6">
              <h3 className="text-base font-semibold font-heading">Best for</h3>
              <ul className="mt-3 space-y-2 text-sm md:text-base text-muted-foreground">
                <li>Creators turning expertise into software products</li>
                <li>Brands wanting proprietary tools instead of generic platforms</li>
                <li>Teams ready to invest in long‑term digital IP</li>
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

export default SoftwareAIPage;

