import { Background, Container, CTA, Footer, Navbar, Wrapper } from "@/components";
import { SectionBadge } from "@/components/ui/section-bade";

const BlockchainCryptoPage = () => {
  return (
    <Background>
      <Wrapper className="py-20 lg:py-24">
        <Navbar />
        <main className="mt-10 md:mt-16">
          <Container className="max-w-4xl mx-auto">
            <SectionBadge title="Services" />
            <h1 className="mt-6 text-3xl md:text-5xl font-heading font-semibold !leading-tight">
              Blockchain &amp; crypto for creators and brands
            </h1>
            <p className="mt-4 text-base md:text-lg text-accent-foreground/70">
              We design and build Web3 products, tokenomics, smart contracts, and crypto-native experiences that
              connect your community to the blockchain — from NFTs and memberships to custom chains and dApps.
            </p>
          </Container>

          <Container className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">NFT &amp; token experiences</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Drops, memberships, and utility tokens that give your audience ownership and new ways to engage.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Smart contracts &amp; dApps</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Audited, deployable contracts and decentralized apps tailored to your use case and chain.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-primary/5 p-6">
              <h2 className="text-lg font-semibold font-heading">Strategy &amp; tokenomics</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Token design, governance, and launch strategy so your Web3 product is built on solid foundations.
              </p>
            </div>
          </Container>

          <Container className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold">
                From idea to chain
              </h2>
              <p className="mt-4 text-sm md:text-base text-muted-foreground">
                We help you scope the right level of blockchain integration — whether that&apos;s a simple
                collectible drop, a membership token, or a full dApp — and then build it with security and
                maintainability in mind.
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                Our focus is on products that create real value for your community and your brand, not tech for
                tech&apos;s sake.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-6">
              <h3 className="text-base font-semibold font-heading">Best for</h3>
              <ul className="mt-3 space-y-2 text-sm md:text-base text-muted-foreground">
                <li>Creators and brands launching NFTs or token-gated experiences</li>
                <li>Teams building dApps, marketplaces, or DeFi-style products</li>
                <li>Anyone needing tokenomics design and smart contract development</li>
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

export default BlockchainCryptoPage;
