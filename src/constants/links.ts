import { LayoutDashboardIcon, PercentIcon, Share2Icon, ShoppingBagIcon, UsersIcon, BarChart3Icon, SettingsIcon, LucideIcon } from 'lucide-react';

type Link = {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const SIDEBAR_LINKS: Link[] = [
    {
        href: "/app",
        label: "Dashboard",
        icon: LayoutDashboardIcon,
    },
    {
        href: "/app/content",
        label: "Content Creation",
        icon: PercentIcon,
    },
    {
        href: "/app/distribution",
        label: "Distribution",
        icon: Share2Icon,
    },
    {
        href: "/app/store",
        label: "Store & Merchandise",
        icon: ShoppingBagIcon,
    },
    {
        href: "/app/team",
        label: "Team & Collaboration",
        icon: UsersIcon,
    },
    {
        href: "/app/analytics",
        label: "Analytics",
        icon: BarChart3Icon,
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
            { name: "Apps", href: "/apps" },
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
