import { LayoutGridIcon, Link2Icon, BarChart3Icon, CalendarIcon, DollarSignIcon, MailIcon, UsersIcon, SettingsIcon, SparklesIcon, LucideIcon } from 'lucide-react';

type Link = {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const SIDEBAR_LINKS: Link[] = [
    {
        href: "/app",
        label: "Creator Tools",
        icon: LayoutGridIcon,
    },
    {
        href: "/app/link-in-bio",
        label: "Link in Bio",
        icon: Link2Icon,
    },
    {
        href: "/app/analytics",
        label: "Analytics",
        icon: BarChart3Icon,
    },
    {
        href: "/app/scheduling",
        label: "Scheduling",
        icon: CalendarIcon,
    },
    {
        href: "/app/monetization",
        label: "Monetization",
        icon: DollarSignIcon,
    },
    {
        href: "/app/email",
        label: "Email",
        icon: MailIcon,
    },
    {
        href: "/app/community",
        label: "Community",
        icon: UsersIcon,
    },
    {
        href: "/app/agency-program",
        label: "Agency Program",
        icon: SparklesIcon,
    },
    {
        href: "/app/settings",
        label: "Settings",
        icon: SettingsIcon,
    },
];

export const FOOTER_LINKS = [
    {
        title: "Product",
        links: [
            { name: "Home", href: "/" },
            { name: "Creator Tools", href: "/app" },
            { name: "Our Apps", href: "/apps" },
            { name: "Case Studies", href: "/case-studies" },
            { name: "Work with us", href: "/work-with-us" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Blog", href: "/blog" },
            { name: "Support", href: "/resources/support" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
        ],
    },
    // {
    //     title: "Developers",
    //     links: [
    //         { name: "API Docs", href: "/api-docs" },
    //         { name: "SDKs", href: "/sdks" },
    //         { name: "Tools", href: "/tools" },
    //         { name: "Open Source", href: "/open-source" },
    //         { name: "Changelog", href: "/changelog" },
    //     ],
    // },
];
