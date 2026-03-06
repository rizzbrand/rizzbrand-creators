import { Background, Container, Wrapper } from "@/components";
import { SectionBadge } from "@/components/ui/section-bade";
import { BrandCard } from "@/components/marketing/brands";
import { brands } from "@/constants/brands";
import Link from "next/link";

const CaseStudiesPage = () => {
  return (
    <Background>
      <Wrapper className="py-20 lg:py-24">
        <div className="mt-10 md:mt-16">
          <Container className="max-w-6xl mx-auto">
            <SectionBadge title="Case Studies" />
            <h1 className="mt-6 text-3xl md:text-5xl font-heading font-semibold !leading-tight">
              Brands we manage
            </h1>
            <p className="mt-4 text-base md:text-lg text-accent-foreground/70">
              A few of the brands we partner with to build products, grow audiences, and scale.
            </p>
          </Container>

          <Container className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {brands.map((brand) => (
                <BrandCard key={brand.title} {...brand} />
              ))}
            </div>
          </Container>

          <Container className="mt-16 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to home
            </Link>
          </Container>
        </div>
      </Wrapper>
    </Background>
  );
};

export default CaseStudiesPage;
