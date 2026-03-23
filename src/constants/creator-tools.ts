/**
 * Creator tools — curated apps for creators (link in bio, analytics, monetization, etc.)
 * Apple App Store–style marketplace.
 */
export type CreatorToolCategory =
  | "Link in Bio"
  | "Analytics"
  | "Scheduling"
  | "Monetization"
  | "Store"
  | "Email"
  | "Community";

export interface CreatorTool {
  id: string;
  name: string;
  tagline: string;
  category: CreatorToolCategory;
  href: string;
  /** Accent color for the card (e.g. #007AFF) */
  accentColor: string;
  /** Optional: path to custom icon. Falls back to gradient if not set */
  icon?: string;
  /** Built by Rizzbrand — links to internal dashboard tool */
  builtByUs?: boolean;
}

/** Tools we're building — internal dashboard routes */
export const OUR_CREATOR_TOOLS: CreatorTool[] = [
  {
    id: "link-in-bio",
    name: "Link in Bio",
    tagline: "One link for all your content.",
    category: "Link in Bio",
    href: "/app/link-in-bio",
    accentColor: "#43E97B",
    icon: "/images/link.png",
    builtByUs: true,
  },
  {
    id: "analytics",
    name: "Analytics",
    tagline: "Track performance across platforms.",
    category: "Analytics",
    href: "/app/analytics",
    accentColor: "#6366F1",
    icon: "/images/data.png",
    builtByUs: true,
  },
  {
    id: "scheduling",
    name: "Scheduling",
    tagline: "Plan and publish content.",
    category: "Scheduling",
    href: "/app/scheduling",
    accentColor: "#00B4D8",
    icon: "/images/schedule.png",
    builtByUs: true,
  },
  {
    id: "monetization",
    name: "Monetization",
    tagline: "Earn from your audience.",
    category: "Monetization",
    href: "/app/monetization",
    accentColor: "#FF424D",
    builtByUs: true,
  },
  {
    id: "email",
    name: "Email",
    tagline: "Grow and engage your list.",
    category: "Email",
    href: "/app/email",
    accentColor: "#FB6970",
    builtByUs: true,
  },
  {
    id: "community",
    name: "Community",
    tagline: "Build and manage your community.",
    category: "Community",
    href: "/app/community",
    accentColor: "#5865F2",
    builtByUs: true,
  },
];

export const CREATOR_TOOLS: CreatorTool[] = [
  {
    id: "linktree",
    name: "Linktree",
    tagline: "One link for all your content.",
    category: "Link in Bio",
    href: "https://linktr.ee",
    accentColor: "#43E97B",
  },
  {
    id: "beacons",
    name: "Beacons",
    tagline: "Link in bio, store & analytics.",
    category: "Link in Bio",
    href: "https://beacons.ai",
    accentColor: "#667EEA",
  },
  {
    id: "stan",
    name: "Stan Store",
    tagline: "Sell digital products & memberships.",
    category: "Link in Bio",
    href: "https://stan.store",
    accentColor: "#FF6B6B",
  },
  {
    id: "taplink",
    name: "Tap Bio",
    tagline: "Smart link in bio for creators.",
    category: "Link in Bio",
    href: "https://tap.bio",
    accentColor: "#4F46E5",
  },
  {
    id: "koji",
    name: "Koji",
    tagline: "Link in bio, tips & mini-apps.",
    category: "Link in Bio",
    href: "https://withkoji.com",
    accentColor: "#F59E0B",
  },
  {
    id: "patreon",
    name: "Patreon",
    tagline: "Membership & recurring revenue.",
    category: "Monetization",
    href: "https://patreon.com",
    accentColor: "#FF424D",
  },
  {
    id: "kofi",
    name: "Ko-fi",
    tagline: "Tips, shop & commissions.",
    category: "Monetization",
    href: "https://ko-fi.com",
    accentColor: "#29ABE2",
  },
  {
    id: "gumroad",
    name: "Gumroad",
    tagline: "Sell digital products & courses.",
    category: "Monetization",
    href: "https://gumroad.com",
    accentColor: "#FF90A4",
  },
  {
    id: "convertkit",
    name: "ConvertKit",
    tagline: "Email marketing for creators.",
    category: "Email",
    href: "https://convertkit.com",
    accentColor: "#FB6970",
  },
  {
    id: "beehiiv",
    name: "Beehiiv",
    tagline: "Newsletter platform.",
    category: "Email",
    href: "https://beehiiv.com",
    accentColor: "#F59E0B",
  },
  {
    id: "later",
    name: "Later",
    tagline: "Visual content planning.",
    category: "Scheduling",
    href: "https://later.com",
    accentColor: "#00B4D8",
  },
  {
    id: "buffer",
    name: "Buffer",
    tagline: "Schedule & publish everywhere.",
    category: "Scheduling",
    href: "https://buffer.com",
    accentColor: "#000000",
  },
  {
    id: "hypeauditor",
    name: "HypeAuditor",
    tagline: "Audience & creator analytics.",
    category: "Analytics",
    href: "https://hypeauditor.com",
    accentColor: "#6366F1",
  },
  {
    id: "socialblade",
    name: "Social Blade",
    tagline: "Social media statistics.",
    category: "Analytics",
    href: "https://socialblade.com",
    accentColor: "#10B981",
  },
  {
    id: "discord",
    name: "Discord",
    tagline: "Build your community.",
    category: "Community",
    href: "https://discord.com",
    accentColor: "#5865F2",
  },
  {
    id: "circle",
    name: "Circle",
    tagline: "Community & membership platform.",
    category: "Community",
    href: "https://circle.so",
    accentColor: "#7C3AED",
  },
];

export const CREATOR_TOOL_CATEGORIES: CreatorToolCategory[] = [
  "Link in Bio",
  "Monetization",
  "Email",
  "Scheduling",
  "Analytics",
  "Community",
];
