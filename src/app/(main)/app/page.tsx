"use client"

import React from 'react'
import { DollarSignIcon, TargetIcon, PlayIcon, ShoppingBagIcon, TrendingUpIcon, CheckCircleIcon, ClockIcon, CalendarIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Container } from "@/components";
import { Badge } from '@/components/ui/badge';

const Page = () => {
    // Mock data - replace with actual data from your database
    const metrics = [
        {
            title: "Total Revenue",
            value: "$12,847",
            change: "+12.5%",
            icon: DollarSignIcon,
            color: "text-green-500",
        },
        {
            title: "Active Campaigns",
            value: "8",
            change: "+2 this week",
            icon: TargetIcon,
            color: "text-blue-500",
        },
        {
            title: "Total Streams",
            value: "45.2K",
            change: "+18.3%",
            icon: PlayIcon,
            color: "text-purple-500",
        },
        {
            title: "Merchandise Sales",
            value: "127",
            change: "+8 today",
            icon: ShoppingBagIcon,
            color: "text-orange-500",
        },
    ];

    const campaigns = [
        {
            title: "Summer Tour Promotion",
            progress: 75,
            endDate: "2024-08-15",
            platforms: ["Instagram", "TikTok", "YouTube"],
        },
        {
            title: "New Album Launch",
            progress: 45,
            endDate: "2024-09-01",
            platforms: ["Spotify", "Apple Music", "Facebook"],
        },
        {
            title: "Merchandise Flash Sale",
            progress: 90,
            endDate: "2024-07-30",
            platforms: ["Instagram", "Website"],
        },
    ];

    const activities = [
        {
            type: "distribution",
            title: "New single 'Midnight Dreams' distributed to Spotify",
            time: "2 hours ago",
            icon: CheckCircleIcon,
            iconColor: "text-green-500",
        },
        {
            type: "campaign_scheduled",
            title: "Instagram story campaign scheduled for tomorrow",
            time: "4 hours ago",
            icon: ClockIcon,
            iconColor: "text-yellow-500",
        },
        {
            type: "order_shipped",
            title: "Merchandise order #1247 shipped",
            time: "6 hours ago",
            icon: CheckCircleIcon,
            iconColor: "text-green-500",
        },
        {
            type: "premiere_scheduled",
            title: "YouTube premiere scheduled for Friday",
            time: "1 day ago",
            icon: CalendarIcon,
            iconColor: "text-blue-500",
        },
    ];

    return (
        <div className="p-6 lg:p-8 w-full">
            <div className="space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                    <p className="text-muted-foreground text-lg">
                        Welcome back! Here&apos;s what&apos;s happening with your music marketing.
                    </p>
                </div>

                {/* Metrics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric, index) => (
                        <Container key={metric.title} delay={index * 0.1}>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {metric.title}
                                    </CardTitle>
                                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metric.value}</div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                        <TrendingUpIcon className="h-3 w-3 text-green-500" />
                                        <span>{metric.change}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Container>
                    ))}
                </div>

                {/* Active Campaigns and Recent Activity */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Active Campaigns */}
                    <Container delay={0.4}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Campaigns</CardTitle>
                                <CardDescription>
                                    Your ongoing marketing campaigns and their progress.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {campaigns.map((campaign, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold">{campaign.title}</h3>
                                            <span className="text-sm text-muted-foreground">
                                                {campaign.progress}%
                                            </span>
                                        </div>
                                        <Progress value={campaign.progress} className="h-2" />
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex flex-wrap gap-1">
                                                {campaign.platforms.map((platform, pIndex) => (
                                                    <Badge key={pIndex} variant="secondary" className="text-xs">
                                                        {platform}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <span className="text-muted-foreground">
                                                Ends {campaign.endDate}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </Container>

                    {/* Recent Activity */}
                    <Container delay={0.5}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>
                                    Latest updates from your campaigns.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {activities.map((activity, index) => (
                                        <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                                            <div className={`mt-0.5 ${activity.iconColor}`}>
                                                <activity.icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">
                                                    {activity.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {activity.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </Container>
                </div>
            </div>
        </div>
    )
};

export default Page
