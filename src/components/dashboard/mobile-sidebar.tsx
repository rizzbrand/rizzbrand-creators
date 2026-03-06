"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SIDEBAR_LINKS } from "@/constants/links";
import { useClerk, useUser } from "@clerk/nextjs";
import { LogOutIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileSidebar = () => {

    const { signOut } = useClerk();
    const { user } = useUser();
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div className="flex lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="flex lg:hidden"
                    >
                        <MenuIcon className="size-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-screen max-w-full">
                    <div className="flex flex-col w-full mt-4 py-3 h-full">
                        {/* Logo Section */}
                        <div className="mb-6">
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
                                                    : "text-foreground/70 w-full !justify-start",
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
                                size="sm"
                                variant="ghost"
                                className="w-full justify-start gap-2 px-4"
                                onClick={handleLogout}
                            >
                                <LogOutIcon className="size-4 mr-1.5" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
};

export default MobileSidebar
