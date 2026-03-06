import { Background, Container, CTA, Footer, Navbar, Wrapper } from "@/components";
import { SectionBadge } from "@/components/ui/section-bade";

const WebAppDevelopmentPage = () => {
  return (
    <Background>
      <Wrapper className="py-20 lg:py-24">
        <Navbar />
        <main className="mt-10 md:mt-16">
          <Container className="max-w-4xl mx-auto">
            <SectionBadge title="Services" />
            <h1 className="mt-6 text-3xl md:text-5xl font-heading font-semibold !leading-tight">
              Web &amp; app development for growing creator brands
            </h1>
            <p className="mt-4 text-base md:text-lg text-accent-foreground/70">
              We design and build high-performing sites, landing pages, and web apps that turn attention into
              revenue. From first line of code to launch, our team handles the full stack so you can stay focused
              on content and community.
            </p>
          </Container>

          <Container className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Conversion‑first landing pages</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Build optimized launch pages for drops, launches, and campaigns that capture emails, drive sales,
                and tell your story clearly.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Full websites &amp; portals</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                From multi-page sites to membership experiences, we architect and ship scalable products on modern
                stacks.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Ongoing improvements</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                We stay with you post‑launch, iterating on performance, SEO, and UX as your audience and products
                evolve.
              </p>
            </div>
          </Container>

          <Container className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold">
                How we build with and for creators
              </h2>
              <p className="mt-4 text-sm md:text-base text-muted-foreground">
                Every project starts with your audience, offers, and business model. We turn that context into a
                clear information architecture, then move quickly into design and development using reusable
                components and production‑ready patterns.
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                We prioritize speed, maintainability, and storytelling so your site doesn&apos;t just look good —
                it works hard for your brand every day.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-6">
              <h3 className="text-base font-semibold font-heading">Best for</h3>
              <ul className="mt-3 space-y-2 text-sm md:text-base text-muted-foreground">
                <li>Creators launching or relaunching their main site</li>
                <li>Brands spinning up campaign or product launch pages</li>
                <li>Teams needing a technical partner, not just a template</li>
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

export default WebAppDevelopmentPage;

