"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from "@/components";
import { getOrCreatePortfolio, createSocialLink, deleteSocialLink } from '@/lib/actions/portfolio';
import { toast } from 'sonner';
import { PlusIcon, LinkIcon, TrashIcon, ExternalLinkIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Page = () => {
    const [portfolio, setPortfolio] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        platform: 'website' as any,
        url: '',
        label: '',
        isVisible: true,
    });

    useEffect(() => {
        loadPortfolio();
    }, []);

    async function loadPortfolio() {
        try {
            const data = await getOrCreatePortfolio();
            setPortfolio(data);
        } catch (error) {
            console.error("Error loading portfolio:", error);
            toast.error("Failed to load portfolio");
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createSocialLink(formData);
            toast.success("Social link added successfully!");
            setDialogOpen(false);
            setFormData({
                platform: 'website',
                url: '',
                label: '',
                isVisible: true,
            });
            loadPortfolio();
        } catch (error) {
            console.error("Error creating social link:", error);
            toast.error("Failed to add social link");
        }
    };

    const handleDelete = async (linkId: string) => {
        if (!confirm("Are you sure you want to delete this link?")) return;
        try {
            await deleteSocialLink(linkId);
            toast.success("Link deleted successfully!");
            loadPortfolio();
        } catch (error) {
            console.error("Error deleting link:", error);
            toast.error("Failed to delete link");
        }
    };

    if (loading) {
        return (
            <div className="p-4 w-full flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const platforms = [
        { value: 'instagram', label: 'Instagram' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'tiktok', label: 'TikTok' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'github', label: 'GitHub' },
        { value: 'behance', label: 'Behance' },
        { value: 'dribbble', label: 'Dribbble' },
        { value: 'website', label: 'Website' },
        { value: 'other', label: 'Other' },
    ];

    return (
        <div className="p-4 md:p-6 lg:p-8 w-full">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Social Links</h1>
                        <p className="text-muted-foreground mt-1">
                            Connect your social media and online presence
                        </p>
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Add Link
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Social Link</DialogTitle>
                                <DialogDescription>
                                    Add a link to your social media or website
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="platform">Platform *</Label>
                                    <Select
                                        value={formData.platform}
                                        onValueChange={(value) => setFormData({ ...formData, platform: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select platform" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {platforms.map((platform) => (
                                                <SelectItem key={platform.value} value={platform.value}>
                                                    {platform.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="url">URL *</Label>
                                    <Input
                                        id="url"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        type="url"
                                        placeholder="https://example.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="label">Label (Optional)</Label>
                                    <Input
                                        id="label"
                                        value={formData.label}
                                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                        placeholder="Custom label"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="isVisible"
                                        checked={formData.isVisible}
                                        onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                                        className="rounded border-gray-300"
                                    />
                                    <Label htmlFor="isVisible">Visible on portfolio</Label>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Add Link</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Links Grid */}
                {portfolio?.socialLinks && portfolio.socialLinks.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {portfolio.socialLinks.map((link: any) => (
                            <Container key={link.id}>
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <LinkIcon className="h-5 w-5 text-primary" />
                                                <CardTitle className="text-lg capitalize">
                                                    {link.label || link.platform}
                                                </CardTitle>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(link.id)}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <CardDescription className="text-xs font-mono break-all">
                                            {link.url}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            asChild
                                        >
                                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                Visit
                                                <ExternalLinkIcon className="h-4 w-4 ml-2" />
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Container>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <LinkIcon className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No links yet</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                Add your social media links and websites
                            </p>
                            <Button onClick={() => setDialogOpen(true)}>
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Add Link
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
};

export default Page

