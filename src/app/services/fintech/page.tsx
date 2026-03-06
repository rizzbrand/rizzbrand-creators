import { Background, Container, CTA, Footer, Navbar, Wrapper } from "@/components";
import { SectionBadge } from "@/components/ui/section-bade";

const FintechPage = () => {
  return (
    <Background>
      <Wrapper className="py-20 lg:py-24">
        <Navbar />
        <main className="mt-10 md:mt-16">
          <Container className="max-w-4xl mx-auto">
            <SectionBadge title="Services" />
            <h1 className="mt-6 text-3xl md:text-5xl font-heading font-semibold !leading-tight">
              Fintech for creators and modern brands
            </h1>
            <p className="mt-4 text-base md:text-lg text-accent-foreground/70">
              We design and build payments, lending, and financial products that turn your audience into
              customers — from checkout and subscriptions to wallets and embedded finance.
            </p>
          </Container>

          <Container className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Payments &amp; checkout</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Seamless payment flows, subscriptions, and payouts so you get paid and your customers have a smooth experience.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Lending &amp; credit</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Credit lines, BNPL, and lending products tailored to your community and use case.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Embedded finance</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Wallets, accounts, and financial tools embedded in your product so users never leave your experience.
              </p>
            </div>
          </Container>

          <Container className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold">
                From idea to live financial product
              </h2>
              <p className="mt-4 text-sm md:text-base text-muted-foreground">
                We help you navigate compliance, partner with the right providers, and build the UX and tech so
                your fintech product is secure, compliant, and a joy to use.
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                Whether you&apos;re adding payments to an existing product or launching something finance-first,
                we&apos;re with you from concept to launch.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-6">
              <h3 className="text-base font-semibold font-heading">Best for</h3>
              <ul className="mt-3 space-y-2 text-sm md:text-base text-muted-foreground">
                <li>Creators and brands adding payments or subscriptions</li>
                <li>Startups building lending or wallet products</li>
                <li>Teams ready to embed finance into their product</li>
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

export default FintechPage;
