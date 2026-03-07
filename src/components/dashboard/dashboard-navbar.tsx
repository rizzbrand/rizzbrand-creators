"use client";

import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import { UserMenu } from "@/components/dashboard/user-menu";
import { HelpCircleIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";

const DashboardNavbar = () => {
  return (
    <header id="dashboard-navbar" className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-background/40 backdrop-blur-md border-b border-border/50 px-4 z-40">
      <Container className="flex items-center justify-between size-full">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex-1">
          ← Back to site
        </Link>
        <div className="flex items-center gap-x-2">
          <UserMenu />
                    <Button
                        size="sm"
                        variant="ghost"
                    >
                        <ZapIcon className="size-4 mr-1.5 text-orange-500 fill-orange-500" />
                        Upgrade
                    </Button>
                    <Button
                        asChild
                        size="icon"
                        variant="ghost"
                        className="hidden lg:flex"
                    >
                        <Link href="/resources/support">
                            <HelpCircleIcon className="size-5" />
                        </Link>
                    </Button>
          <MobileSidebar />
        </div>
      </Container>
    </header>
  );
};

export default DashboardNavbar
