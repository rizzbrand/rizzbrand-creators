/**
 * App ecosystem — apps built by the studio.
 * Add new apps here to show them on the /apps page (Apple App Store–style).
 */
export type AppCategory = "Productivity" | "Finance" | "Community" | "Creators" | "Music" | "Other";

export interface EcosystemApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: AppCategory;
  icon: string; // path to image, e.g. /images/apps/icon.png
  href: string; // external link or internal route
  featured?: boolean;
  /** Optional accent color for the card (e.g. #007AFF) */
  accentColor?: string;
}

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  {
    id: "rizflow",
    name: "Rizflow",
    tagline: "Music marketing, simplified.",
    description: "Plan releases, track campaigns, and grow your audience in one place. Built for artists and labels.",
    category: "Music",
    icon: "/images/rizflow2.png",
    href: "https://www.rizflow.site",
    featured: true,
    accentColor: "#FF6B35",
  },
  {
    id: "payollar",
    name: "Payollar",
    tagline: "Get paid like a pro for your skill & services",
    description: "Payments and payouts for creators. One dashboard for earnings, invoices, and tax-ready reports.",
    category: "Finance",
    icon: "/images/payollar.jpg",
    href: "https://www.payollar.com",
    featured: true,
    accentColor: "#34C759",
  },
  {
    id: "moodify",
    name: "Moodify",
    tagline: "Buy & Sell luxury properties",
    description: "E‑commerce and community for creator brands. Sell products and connect with your audience.",
    category: "Creators",
    icon: "/images/moodify.png",
    href: "https://www.moodify.site",
    accentColor: "#AF52DE",
  },
  {
    id: "carfusion",
    name: "CarFusion",
    tagline: "Find your next ride.",
    description: "Discover and compare cars. Built for car enthusiasts and buyers who want clarity, not clutter.",
    category: "Other",
    icon: "/images/carfusion2.png",
    href: "https://www.carfusion.site",
  },
  {
    id: "trackify",
    name: "Trackify",
    tagline: "finance management for creators",
    description: "Brand and product experiences that scale across markets and audiences.",
    category: "Other",
    icon: "/images/trackifyatlas.png",
    href: "https://www.mytrackify.com",
  },
];
