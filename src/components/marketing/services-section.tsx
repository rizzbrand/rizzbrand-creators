"use client";

import Link from "next/link";
import { ArrowRightIcon, Bot, Coins, Cpu, Landmark, MonitorSmartphone, PencilRuler } from "lucide-react";
import Container from "../global/container";
import { SectionBadge } from "../ui/section-bade";
import MagicCard from "../ui/magic-card";

const services = [
  {
    title: "Fintech",
    description: "Payments, lending, and financial products built for creators and modern brands.",
    href: "/services/fintech",
    icon: Landmark,
  },
  {
    title: "Web & App Development",
    description: "Design, build, and ship high-performing web and mobile experiences.",
    href: "/services/web-app-development",
    icon: MonitorSmartphone,
  },
  {
    title: "AI Automation",
    description: "Automate workflows, content, and operations with intelligent AI systems.",
    href: "/services/ai-automation",
    icon: Bot,
  },
  {
    title: "Product Design & Development",
    description: "Validate ideas, craft user-centered products, and design delightful experiences.",
    href: "/services/product-development-design",
    icon: PencilRuler,
  },
  {
    title: "Software & AI",
    description: "Ship custom software and AI products around your audience and business.",
    href: "/services/software-ai",
    icon: Cpu,
  },
  {
    title: "Blockchain & Crypto",
    description: "Web3 products, tokenomics, smart contracts, and crypto-native experiences.",
    href: "/services/blockchain-crypto",
    icon: Coins,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-12 md:py-16 lg:py-24 w-full scroll-mt-24">
      <Container>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <SectionBadge title="Services" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            What we build for you
          </h2>
          <p className="text-base md:text-lg text-accent-foreground/80 mt-4">
            From web apps to AI, product design, software, and blockchain — one studio for your full stack.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group block h-full"
              >
                <MagicCard particles={true} className="flex flex-col items-start w-full h-full bg-primary/[0.08]">
                  <div className="bento-card w-full flex flex-col p-5 md:p-6 text-left h-full">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <h3 className="mt-4 text-lg font-heading font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </MagicCard>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;
