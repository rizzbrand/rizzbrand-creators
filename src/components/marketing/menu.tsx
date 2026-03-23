"use client"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Bot, CircleHelp, Cpu, MonitorSmartphone, Newspaper, PencilRuler } from "lucide-react";
import Link from 'next/link';
import React from 'react';
import Icons from "../global/icons";

interface Props {
    title: string;
    href: string;
    children: React.ReactNode;
    icon: React.ReactNode;
}

const Menu = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className="h-10 px-4 py-2 text-sm font-normal rounded-md text-muted-foreground hover:text-foreground w-max hover:bg-none">
                        Rizzbrand
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground">
                        Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid rounded-3xl gap-2 p-3 md:w-[400px] lg:w-[500px] xl:w-[550px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-4">
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/"
                                        className="flex flex-col justify-end w-full h-full p-4 no-underline rounded-lg outline-none select-none bg-gradient-to-tr from-accent to-accent/50 focus:shadow-md"
                                    >
                                        <Icons.icon className="w-6 h-6" />
                                        <div className="my-2 text-lg font-normal">
                                            Rizzbrand Studio
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            A full-service studio helping creators build brands, products, software &amp; AI.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <Item title="Web & App Development" href="/services/web-app-development" icon={<MonitorSmartphone className="w-5 h-5" />}>
                                Design, build, and ship high-performing web and mobile experiences.
                            </Item>
                            <Item title="AI Automation" href="/services/ai-automation" icon={<Bot className="w-5 h-5" />}>
                                Automate workflows, content, and operations with intelligent AI systems.
                            </Item>
                            <Item title="Product Development & Design" href="/services/product-development-design" icon={<PencilRuler className="w-5 h-5" />}>
                                Validate ideas, craft user-centered products, and design delightful experiences.
                            </Item>
                            <Item title="Software & AI" href="/services/software-ai" icon={<Cpu className="w-5 h-5" />}>
                                Ship custom software and AI products around your audience and business.
                            </Item>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/apps" legacyBehavior passHref>
                        <NavigationMenuLink className="h-10 px-4 py-2 text-sm font-normal rounded-md text-muted-foreground hover:text-foreground w-max hover:bg-none">
                            Our Apps
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/agency-program" legacyBehavior passHref>
                        <NavigationMenuLink className="h-10 px-4 py-2 text-sm font-normal rounded-md text-muted-foreground hover:text-foreground w-max hover:bg-none">
                            Creators Program
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground">
                        Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] xl:w-[500px]">
                            <Item title="Insights" href="/blog" icon={<Newspaper className="w-5 h-5" />}>
                                Read our latest articles and updates.
                            </Item>
                            <Item title="Support" href="/resources/support" icon={<CircleHelp className="w-5 h-5" />}>
                                Get help with any issues you may have.
                            </Item>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="ml-2 mr-1 lg:mr-0">
                    <Link href="/app" legacyBehavior passHref>
                        <NavigationMenuLink className="h-10 px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 w-max">
                            Creator Tools
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
};

const Item = ({ title, href, children, icon, ...props }: Props) => {
    return (
        <li>
                    <NavigationMenuLink asChild>
                <Link
                    passHref
                    href={href}
                    {...props}
                    className="grid grid-cols-[.15fr_1fr] select-none space-y-1 rounded-lg px-3 py-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                >
                    <div className="flex items-center mt-1 justify-center p-1 w-8 h-8 rounded-md border border-border/80">
                        {icon}
                    </div>
                    <div className="text-start ml-3">
                        <span className="text-sm group-hover:text-foreground font-normal leading-none">
                            {title}
                        </span>
                        <p className="text-sm mt-0.5 line-clamp-2 text-muted-foreground">
                            {children}
                        </p>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
};

Item.displayName = "Item";

export default Menu
