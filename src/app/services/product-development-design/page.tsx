import { Background, Container, CTA, Footer, Navbar, Wrapper } from "@/components";
import { SectionBadge } from "@/components/ui/section-bade";

const ProductDevelopmentDesignPage = () => {
  return (
    <Background>
      <Wrapper className="py-20 lg:py-24">
        <Navbar />
        <main className="mt-10 md:mt-16">
          <Container className="max-w-4xl mx-auto">
            <SectionBadge title="Services" />
            <h1 className="mt-6 text-3xl md:text-5xl font-heading font-semibold !leading-tight">
              Product development &amp; design for creator‑led brands
            </h1>
            <p className="mt-4 text-base md:text-lg text-accent-foreground/70">
              We partner with you from idea to in‑market product — validating concepts, designing experiences, and
              building the systems to scale what works.
            </p>
          </Container>

          <Container className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Strategy &amp; positioning</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Clarify who the product is for, what it solves, and how it fits into your brand and ecosystem.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Product &amp; UX design</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Turn ideas into interfaces, flows, and prototypes that feel natural for your audience and team.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Launch &amp; iteration</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Support your launch, measure how users behave, and refine the product with real usage data.
              </p>
            </div>
          </Container>

          <Container className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold">
                A full stack team around your product vision
              </h2>
              <p className="mt-4 text-sm md:text-base text-muted-foreground">
                You bring the audience, insight, and ambition. We bring product strategy, design, and technical
                execution so you can move from &quot;idea&quot; to &quot;live&quot; without building a full‑time
                product team on day one.
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                This service pairs especially well with our Web &amp; App Development and AI Automation offerings
                when you&apos;re building an ecosystem, not just a single feature.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-6">
              <h3 className="text-base font-semibold font-heading">Best for</h3>
              <ul className="mt-3 space-y-2 text-sm md:text-base text-muted-foreground">
                <li>Creators launching their first productized offer or SaaS</li>
                <li>Brands expanding into new digital products or experiences</li>
                <li>Teams who want a thought partner across strategy, UX, and build</li>
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

export default ProductDevelopmentDesignPage;

