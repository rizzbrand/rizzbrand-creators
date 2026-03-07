"use client";

import { SIDEBAR_LINKS } from "@/constants/links";
import Icons from "@/components/global/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../global/container";
import { buttonVariants } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/functions";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "U";

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
                        <Icons.icon className="h-10 w-10" />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold leading-tight">
                                Rizzbrand
                            </span>
                            <span className="text-xs text-muted-foreground leading-tight">
                                Creator Tools
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
                    <div className="flex items-center gap-3 px-2">
                        <Avatar className="h-9 w-9 shrink-0">
                            <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? "User"} />
                            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user?.name ?? "User"}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardSidebar
