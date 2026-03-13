import {
  Globe,
  Hexagon,
  Layers,
  Car,
  Building2,
  DollarSign,
  Stethoscope,
  Tv,
  Sparkles,
} from "lucide-react";

const ROLES = [
  "Web/App Developer",
  "Software & AI Engineer",
  "Blockchain Developer",
  "Product Designer",
];

const TECHNICAL = {
  "CORE TECH (WEB DESIGN)": [
    "Python",
    "JavaScript/TypeScript",
    "Figma",
    "Solidity",
    "Shopify",
    "React/Next.js",
    "Node.js",
    "Framer motion",
    "Gsap",
  ],
  "BLOCKCHAIN & WEB 3": [
    "Smart contracts",
    "Token creation",
    "Assets tokenization",
    "web 3 integration",
    "NFT marketplace",
  ],
  "AI & DATA": [
    "Machine Learning",
    "NLP",
    "Predictive Analytics",
    "Data Engineering",
    "AI Integration",
  ],
  "PRODUCT DESIGN & MANAGEMENT": [
    "UI/UX Design",
    "Graphic design",
    "Product Strategy",
    "System Architecture",
    "Prototyping",
    "Wireframing",
    "Campaigns",
    "Content management systems",
  ],
};

const VENTURES = [
  {
    role: "CTO",
    company: "Trackify Finance",
    tag: "FINTECH",
    tagColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    icon: Sparkles,
    description:
      "Built a comprehensive fintech accounting and management platform. Architected AI-driven insights for personal finance tracking and automated bookkeeping solutions.",
  },
  {
    role: "Web designer",
    company: "RizFlow",
    tag: "ECOMMERCE",
    tagColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    icon: DollarSign,
    description:
      "Developed a decentralized community platform empowering artists to market, distribute, and sell merchandise. Implemented smart contracts for secure transactions and royalty distribution with stablecoins.",
  },
  {
    role: "Web designer",
    company: "Moodify",
    tag: "RWA",
    tagColor: "bg-teal-500/20 text-teal-400 border border-teal-500/30",
    icon: Building2,
    description:
      "Pioneered Real World Asset (RWA) tokenization for a real estate agency. Enabled fractional ownership of properties through secure blockchain infrastructure.",
  },
  {
    role: "Software Engineer",
    company: "CarFusion",
    tag: "PRODUCT",
    tagColor: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
    icon: Car,
    description:
      "Engineered a versatile automotive platform facilitating vehicle buying, renting, and swapping. Designed the product workflow to ensure trust and ease of use for users.",
  },
  {
    role: "Software Engineer",
    company: "Gelos",
    tag: "HEALTH",
    tagColor: "bg-green-600/20 text-green-400 border border-green-600/30",
    icon: Stethoscope,
    description:
      "Developed practice management software for a dental care agency, streamlining patient booking, records management, and operational workflows.",
  },
  {
    role: "Web designer",
    company: "Payollar",
    tag: "MEDIA",
    tagColor: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
    icon: Tv,
    description:
      "Contributed to a media booking agency platform, optimizing high-traffic reservation systems and payment gateway integrations.",
  },
];

export default function CVPage() {
  return (
    <div className="min-h-screen bg-[#0A0A1F] text-white">
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="bg-gradient-to-r from-[#B2A8FD] via-[#8678F9] to-[#C7D2FE] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Divine Gabriel
          </h1>
          <ul className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/90">
            {ROLES.map((role, i) => (
              <li key={role} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-white/40" aria-hidden>
                    •
                  </span>
                )}
                {role}
              </li>
            ))}
          </ul>
        </header>

        {/* Professional Summary */}
        <section className="mb-8 rounded-2xl border border-white/10 bg-[#1E1E3F]/80 p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#28284C] text-[#B2A8FD]">
              <Globe className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-[#B2A8FD]">
              Professional Summary
            </h2>
          </div>
          <p className="mt-4 leading-relaxed text-white/90">
            Full-stack developer and designer focused on web design & development,
            AI integrations, and process automation. I build modern, responsive
            apps and sites from UI/UX and front-end to APIs and back-end and
            integrate AI and automation to improve workflows and user experiences.
          </p>
        </section>

        {/* Technical Arsenal */}
        <section className="mb-8 rounded-2xl border border-white/10 bg-[#1E1E3F]/80 p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#28284C] text-[#B2A8FD]">
              <Hexagon className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-[#B2A8FD]">
              Technical Arsenal
            </h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {Object.entries(TECHNICAL).map(([category, skills]) => (
              <div key={category}>
                <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-[#B2A8FD]/90">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-[#28284C] px-3 py-1.5 text-xs font-medium text-white/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Venture Timeline */}
        <section className="rounded-2xl border border-white/10 bg-[#1E1E3F]/80 p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#28284C] text-[#B2A8FD]">
              <Layers className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-[#B2A8FD]">
              Venture Timeline
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {VENTURES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={`${v.company}-${v.role}`}
                  className="rounded-xl border border-white/5 bg-[#0A0A1F]/60 p-5 transition-colors hover:border-white/10"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#28284C] text-[#B2A8FD]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {v.role} — {v.company}
                        </p>
                        <span
                          className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${v.tagColor}`}
                        >
                          {v.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/80">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
