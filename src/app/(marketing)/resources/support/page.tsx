import { Background, Container, Footer, Navbar, Wrapper } from "@/components";
import { SectionBadge } from "@/components/ui/section-bade";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, MessageCircle, FileText, ArrowRight } from "lucide-react";

const SUPPORT_OPTIONS = [
  {
    title: "Project inquiries",
    description: "Have a project in mind? Tell us about your goals and we'll get back with next steps.",
    href: "/work-with-us",
    icon: MessageCircle,
  },
  {
    title: "General support",
    description: "Questions about our services, pricing, or process? Drop us a line.",
    href: "mailto:hey@rizzbrands.site",
    icon: Mail,
  },
  {
    title: "Insights & guides",
    description: "Browse our blog for articles on building products, creator economy, and more.",
    href: "/blog",
    icon: FileText,
  },
];

const FAQ_ITEMS = [
  {
    q: "How do I get started?",
    a: "Fill out our Work with us form with your project details. We typically reply within 1–2 business days with next steps and a potential fit assessment.",
  },
  {
    q: "What services do you offer?",
    a: "We offer web & app development, AI automation, product development & design, and custom software & AI. Check our Features menu for details.",
  },
  {
    q: "Do you work with creators and agencies?",
    a: "Yes. We partner with creators, agencies, and brands to build products, launch brands, and ship software. Tell us about your project in the Work with us form.",
  },
  {
    q: "What's your typical timeline?",
    a: "It depends on scope. Small projects can start within weeks; larger builds may need more planning. Share your timeline in your inquiry and we'll align.",
  },
];

export default function SupportPage() {
  return (
    <Background>
      <Navbar />
      <Wrapper className="py-16 md:py-24 min-h-screen">
        <Container className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <SectionBadge title="Support" />
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-heading font-semibold tracking-tight">
              How can we help?
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
              Get help with our services, start a project, or find answers to common questions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {SUPPORT_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isExternal = option.href.startsWith("http") || option.href.startsWith("mailto");
              return (
                <Link
                  key={option.title}
                  href={option.href}
                  {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{option.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{option.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {isExternal ? "Contact us" : "Get started"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-6">Frequently asked questions</h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.q}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <h3 className="font-medium text-foreground">{item.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Ready to build something? Start with a project brief.
            </p>
            <Button asChild>
              <Link href="/work-with-us">
                Work with us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Wrapper>
      <Footer />
    </Background>
  );
}
