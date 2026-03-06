"use client";

import { SIDEBAR_LINKS } from "@/constants/links";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../global/container";
import { Button, buttonVariants } from "../ui/button";

import { cn } from "@/functions";
import { useClerk, useUser } from "@clerk/nextjs";


const DashboardSidebar = () => {

    const { signOut } = useClerk();
    const { user } = useUser();
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div
            id="sidebar"
            className="flex-col hidden lg:flex fixed left-0 top-0 bottom-0 z-50 bg-background border-r border-border/50 w-64"
        >
            <div className={cn(
                "flex flex-col size-full p-4"
            )}>
                {/* Logo Section */}
                <div className="mb-8 pt-4">
                    <Link href="/app" className="flex items-center gap-x-3">
                        <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold">P&G</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold leading-tight">
                                pine& gingr
                            </span>
                            <span className="text-xs text-muted-foreground leading-tight">
                                Music Marketing Platform
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <ul className="w-full space-y-1 flex-1">
                    {SIDEBAR_LINKS.map((link, index) => {
                        const isActive = pathname === link.href;

                        return (
                            <li key={index} className="w-full">
                                <Link
                                    href={link.href}
                                    className={buttonVariants({
                                        variant: "ghost",
                                        className: isActive 
                                            ? "bg-muted text-primary w-full !justify-start" 
                                            : "text-foreground/70 w-full !justify-start hover:bg-muted/50",
                                    })}
                                >
                                    <link.icon strokeWidth={2} className="size-[18px] mr-3" />
                                    {link.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* User Section */}
                <div className="mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-3 mb-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                                {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress?.[0] || 'U'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {user?.fullName || user?.firstName || 'User'}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start"
                    >
                        <LogOutIcon className="size-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default DashboardSidebar
