"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Container } from "@/components";
// import { currentUser } from '@clerk/nextjs/server';  // Clerk removed
import { toast } from 'sonner';
import { SaveIcon, UserIcon } from 'lucide-react';

const Page = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        location: '',
        website: '',
    });

    useEffect(() => {
        async function loadUser() {
            try {
                // Note: currentUser is a server function, so we'd need an API route
                // For now, we'll use a client-side approach
                setFormData({
                    name: 'Your Name',
                    bio: '',
                    location: '',
                    website: '',
                });
            } catch (error) {
                console.error("Error loading user:", error);
                toast.error("Failed to load user settings");
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, []);

    const handleSave = async () => {
        try {
            // TODO: Implement user update
            toast.success("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings");
        }
    };

    if (loading) {
        return (
            <div className="p-4 w-full flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 w-full">
            <div className="space-y-6 max-w-3xl">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your account settings and preferences
                    </p>
                </div>

                {/* Profile Settings */}
                <Container>
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your personal information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <textarea
                                    id="bio"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    rows={4}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    type="url"
                                />
                            </div>
                            <Button onClick={handleSave}>
                                <SaveIcon className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </Container>

                {/* Account Settings */}
                <Container delay={0.1}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Manage your account settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">
                                        Manage your email (sign in coming soon)
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Manage
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Password</p>
                                    <p className="text-sm text-muted-foreground">
                                        Change your password
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Change
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </div>
    )
};

export default Page

