"use client"

import React, { useState } from 'react'
import { 
    Music, 
    Youtube, 
    Instagram, 
    Video, 
    Facebook,
    CheckCircle, 
    Clock, 
    AlertCircle,
    Settings,
    Link as LinkIcon,
    Calendar,
    Zap,
    BarChart3,
    Apple
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Container } from "@/components";
import { toast } from 'sonner';

const Page = () => {
    const [platforms, setPlatforms] = useState([
        {
            id: "spotify",
            name: "Spotify",
            icon: Music,
            followers: "12.5K",
            lastSync: "2 hours ago",
            status: "connected",
            statusIcon: CheckCircle,
            statusColor: "text-green-500",
        },
        {
            id: "youtube-music",
            name: "YouTube Music",
            icon: Youtube,
            followers: "8.2K",
            lastSync: "1 hour ago",
            status: "connected",
            statusIcon: CheckCircle,
            statusColor: "text-green-500",
        },
        {
            id: "apple-music",
            name: "Apple Music",
            icon: Apple,
            followers: "6.8K",
            lastSync: "5 hours ago",
            status: "connected",
            statusIcon: Clock,
            statusColor: "text-yellow-500",
        },
        {
            id: "instagram",
            name: "Instagram",
            icon: Instagram,
            followers: "25.1K",
            lastSync: "30 min ago",
            status: "connected",
            statusIcon: CheckCircle,
            statusColor: "text-green-500",
        },
        {
            id: "tiktok",
            name: "TikTok",
            icon: Video,
            followers: "0",
            lastSync: "Never",
            status: "disconnected",
            statusIcon: AlertCircle,
            statusColor: "text-red-500",
        },
        {
            id: "facebook",
            name: "Facebook",
            icon: Facebook,
            followers: "15.3K",
            lastSync: "1 hour ago",
            status: "connected",
            statusIcon: CheckCircle,
            statusColor: "text-green-500",
        },
    ]);

    const handleConnect = (platformId: string) => {
        setPlatforms(platforms.map(p => 
            p.id === platformId 
                ? { ...p, status: "connected", statusIcon: CheckCircle, statusColor: "text-green-500", lastSync: "Just now", followers: "0" }
                : p
        ));
        toast.success(`${platforms.find(p => p.id === platformId)?.name} connected successfully!`);
    };

    const handleDisconnect = (platformId: string) => {
        setPlatforms(platforms.map(p => 
            p.id === platformId 
                ? { ...p, status: "disconnected", statusIcon: AlertCircle, statusColor: "text-red-500", lastSync: "Never", followers: "0" }
                : p
        ));
        toast.success(`${platforms.find(p => p.id === platformId)?.name} disconnected`);
    };

    const handleConfigure = (platformId: string) => {
        toast.info(`Configuring ${platforms.find(p => p.id === platformId)?.name}...`);
    };

    return (
        <div className="p-6 lg:p-8 w-full">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold mb-2">Distribution & Automation</h1>
                    <p className="text-muted-foreground text-lg">
                        Manage your content distribution across all platforms and automate your marketing.
                    </p>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="platforms" className="w-full">
                    <TabsList>
                        <TabsTrigger value="platforms">Platforms</TabsTrigger>
                        <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
                        <TabsTrigger value="automation">Automation</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    {/* Platforms Tab */}
                    <TabsContent value="platforms" className="mt-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {platforms.map((platform, index) => (
                                <Container key={platform.id} delay={index * 0.1}>
                                    <Card className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-muted">
                                                        <platform.icon className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Followers</span>
                                                    <span className="font-semibold">{platform.followers} followers</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Last sync</span>
                                                    <span className="font-medium">{platform.lastSync}</span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {/* Status */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <platform.statusIcon className={`h-4 w-4 ${platform.statusColor}`} />
                                                    <Badge 
                                                        variant={platform.status === "connected" ? "default" : "secondary"}
                                                        className={platform.status === "connected" ? "" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}
                                                    >
                                                        {platform.status === "connected" ? "Connected" : "Disconnected"}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                {platform.status === "connected" ? (
                                                    <>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1"
                                                            onClick={() => handleConfigure(platform.id)}
                                                        >
                                                            <Settings className="h-4 w-4 mr-2" />
                                                            Configure
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => handleDisconnect(platform.id)}
                                                        >
                                                            <LinkIcon className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button
                                                        className="flex-1"
                                                        onClick={() => handleConnect(platform.id)}
                                                    >
                                                        <LinkIcon className="h-4 w-4 mr-2" />
                                                        Connect
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Container>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Scheduler Tab */}
                    <TabsContent value="scheduler" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Scheduler</CardTitle>
                                <CardDescription>
                                    Schedule your content distribution across platforms
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Scheduler Coming Soon</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        Schedule your content to be distributed automatically across all connected platforms.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Automation Tab */}
                    <TabsContent value="automation" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Automation Rules</CardTitle>
                                <CardDescription>
                                    Set up automated workflows for your content distribution
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Automation Coming Soon</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        Create automation rules to streamline your content distribution workflow.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Distribution Analytics</CardTitle>
                                <CardDescription>
                                    Track performance across all your connected platforms
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        View detailed analytics and insights for your content distribution across all platforms.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
};

export default Page

