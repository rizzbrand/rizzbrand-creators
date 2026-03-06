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
            { name: "Features", href: "/" },
            { name: "Pricing", href: "/" },
            { name: "Contact", href: "/" },
            { name: "Download", href: "/" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Blog", href: "/blog" },
            { name: "Help Center", href: "/help-center" },
            { name: "Community", href: "/community" },
            { name: "Guides", href: "/guides" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Cookies", href: "/cookies" },
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
