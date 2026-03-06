"use client"

import React, { useState } from 'react'
import { PlusIcon, MailIcon, UserPlusIcon, MoreVerticalIcon, CrownIcon, ShieldIcon, UserIcon, SearchIcon, FilterIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Container } from "@/components";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    // Mock team data - replace with actual data from your database
    const teamMembers = [
        {
            id: "1",
            name: "Alex Rivera",
            email: "alex.rivera@example.com",
            role: "Owner",
            roleColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
            avatar: null,
            status: "active",
            joinedDate: "2024-01-15",
            campaigns: 8,
            lastActive: "2 hours ago",
        },
        {
            id: "2",
            name: "Sarah Chen",
            email: "sarah.chen@example.com",
            role: "Manager",
            roleColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
            avatar: null,
            status: "active",
            joinedDate: "2024-02-20",
            campaigns: 5,
            lastActive: "1 hour ago",
        },
        {
            id: "3",
            name: "Marcus Johnson",
            email: "marcus.j@example.com",
            role: "Member",
            roleColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
            avatar: null,
            status: "active",
            joinedDate: "2024-03-10",
            campaigns: 3,
            lastActive: "5 hours ago",
        },
        {
            id: "4",
            name: "Emily Davis",
            email: "emily.davis@example.com",
            role: "Member",
            roleColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
            avatar: null,
            status: "pending",
            joinedDate: "2024-06-01",
            campaigns: 0,
            lastActive: "Never",
        },
    ];

    const recentActivity = [
        {
            id: "1",
            user: "Sarah Chen",
            action: "created a new campaign",
            target: "Summer Tour Promotion",
            time: "2 hours ago",
            icon: CheckCircleIcon,
            iconColor: "text-blue-500",
        },
        {
            id: "2",
            user: "Marcus Johnson",
            action: "updated distribution settings",
            target: "Spotify & Apple Music",
            time: "4 hours ago",
            icon: CheckCircleIcon,
            iconColor: "text-green-500",
        },
        {
            id: "3",
            user: "Alex Rivera",
            action: "invited a new team member",
            target: "Emily Davis",
            time: "1 day ago",
            icon: UserPlusIcon,
            iconColor: "text-purple-500",
        },
    ];

    const filteredMembers = teamMembers.filter((member) => {
        const matchesSearch = 
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || member.role.toLowerCase() === roleFilter.toLowerCase();
        return matchesSearch && matchesRole;
    });

    const handleInvite = (email: string, role: string) => {
        toast.success(`Invitation sent to ${email} as ${role}`);
        // TODO: Implement actual invite functionality
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const getRoleIcon = (role: string) => {
        switch (role.toLowerCase()) {
            case "owner":
                return <CrownIcon className="h-4 w-4" />;
            case "manager":
                return <ShieldIcon className="h-4 w-4" />;
            default:
                return <UserIcon className="h-4 w-4" />;
        }
    };

    return (
        <div className="p-6 lg:p-8 w-full">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Team & Collaboration</h1>
                        <p className="text-muted-foreground text-lg">
                            Manage your team members and collaborate on campaigns
                        </p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <UserPlusIcon className="h-4 w-4 mr-2" />
                                Invite Team Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Invite Team Member</DialogTitle>
                                <DialogDescription>
                                    Send an invitation to collaborate on your music marketing campaigns
                                </DialogDescription>
                            </DialogHeader>
                            <InviteForm onInvite={handleInvite} />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Container>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                                <UserIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{teamMembers.length}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {teamMembers.filter(m => m.status === "active").length} active
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.1}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Managers</CardTitle>
                                <ShieldIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {teamMembers.filter(m => m.role === "Manager").length}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Team managers
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.2}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
                                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {teamMembers.filter(m => m.status === "pending").length}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Awaiting response
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.3}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                                <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {teamMembers.reduce((sum, m) => sum + m.campaigns, 0)}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Team campaigns
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Team Members List */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Filters */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search team members..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <FilterIcon className="h-4 w-4 mr-2" />
                                            <SelectValue placeholder="Filter by role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Roles</SelectItem>
                                            <SelectItem value="owner">Owner</SelectItem>
                                            <SelectItem value="manager">Manager</SelectItem>
                                            <SelectItem value="member">Member</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Team Members */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Team Members</CardTitle>
                                <CardDescription>
                                    Manage your team and their permissions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {filteredMembers.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <Avatar>
                                                    <AvatarImage src={member.avatar || undefined} />
                                                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                                                        {getInitials(member.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="font-semibold">{member.name}</p>
                                                        {member.status === "pending" && (
                                                            <Badge variant="outline" className="text-xs">
                                                                <ClockIcon className="h-3 w-3 mr-1" />
                                                                Pending
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {member.email}
                                                    </p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <Badge className={`text-xs ${member.roleColor}`}>
                                                            <span className="mr-1">
                                                                {getRoleIcon(member.role)}
                                                            </span>
                                                            {member.role}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">
                                                            {member.campaigns} campaigns
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            Last active: {member.lastActive}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVerticalIcon className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <MailIcon className="h-4 w-4 mr-2" />
                                                        Send Message
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Edit Role
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive">
                                                        <XCircleIcon className="h-4 w-4 mr-2" />
                                                        Remove from Team
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity */}
                    <Container delay={0.4}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Team Activity</CardTitle>
                                <CardDescription>
                                    Recent collaboration updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                                            <div className={`mt-0.5 ${activity.iconColor}`}>
                                                <activity.icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm">
                                                    <span className="font-medium">{activity.user}</span>{" "}
                                                    {activity.action}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {activity.target}
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

// Invite Form Component
const InviteForm = ({ onInvite }: { onInvite: (email: string, role: string) => void }) => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("member");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            onInvite(email, role);
            setEmail("");
            setRole("member");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="colleague@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="member">
                            <div className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4" />
                                Member - Can view and edit campaigns
                            </div>
                        </SelectItem>
                        <SelectItem value="manager">
                            <div className="flex items-center gap-2">
                                <ShieldIcon className="h-4 w-4" />
                                Manager - Can manage campaigns and team
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">
                    Cancel
                </Button>
                <Button type="submit">
                    <MailIcon className="h-4 w-4 mr-2" />
                    Send Invitation
                </Button>
            </div>
        </form>
    );
};

export default Page

