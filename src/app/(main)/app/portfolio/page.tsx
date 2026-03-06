"use client"

import React, { useEffect, useState, useTransition } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Container } from "@/components";
import { getOrCreatePortfolio, updatePortfolio } from '@/lib/actions/portfolio';
import { toast } from 'sonner';
import { SaveIcon, EyeIcon, GlobeIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [portfolio, setPortfolio] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        coverImage: '',
        theme: 'default',
        metaTitle: '',
        metaDescription: '',
        customDomain: '',
        isPublished: false,
    });
    const router = useRouter();

    useEffect(() => {
        async function loadPortfolio() {
            try {
                const data = await getOrCreatePortfolio();
                setPortfolio(data);
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    coverImage: data.coverImage || '',
                    theme: data.theme || 'default',
                    metaTitle: data.metaTitle || '',
                    metaDescription: data.metaDescription || '',
                    customDomain: data.customDomain || '',
                    isPublished: data.isPublished || false,
                });
            } catch (error) {
                console.error("Error loading portfolio:", error);
                toast.error("Failed to load portfolio");
            } finally {
                setLoading(false);
            }
        }
        loadPortfolio();
    }, []);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updated = await updatePortfolio(formData);
            setPortfolio(updated);
            toast.success("Portfolio updated successfully!");
        } catch (error) {
            console.error("Error updating portfolio:", error);
            toast.error("Failed to update portfolio");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-4 w-full flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const themes = [
        { value: 'default', label: 'Default', description: 'Clean and professional' },
        { value: 'dark', label: 'Dark', description: 'Modern dark theme' },
        { value: 'minimal', label: 'Minimal', description: 'Simple and elegant' },
        { value: 'creative', label: 'Creative', description: 'Bold and expressive' },
    ];

    return (
        <div className="p-4 md:p-6 lg:p-8 w-full">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
                {/* Editor Panel */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Portfolio Builder</h1>
                            <p className="text-muted-foreground mt-1">
                                Customize your portfolio settings and design
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                asChild
                            >
                                <Link href={`/creator/${portfolio?.slug}`} target="_blank">
                                    <EyeIcon className="h-4 w-4 mr-2" />
                                    Preview
                                </Link>
                            </Button>
                            <Button 
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <SaveIcon className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <Container>
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>
                                    Set up your portfolio's basic details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Portfolio Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="My Amazing Portfolio"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="A brief description of your portfolio..."
                                        rows={4}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="coverImage">Cover Image URL</Label>
                                    <Input
                                        id="coverImage"
                                        value={formData.coverImage}
                                        onChange={(e) => handleInputChange('coverImage', e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        type="url"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Container>

                    {/* Theme Selection */}
                    <Container delay={0.1}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Theme</CardTitle>
                                <CardDescription>
                                    Choose a theme for your portfolio
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {themes.map((theme) => (
                                        <button
                                            key={theme.value}
                                            onClick={() => handleInputChange('theme', theme.value)}
                                            className={`p-4 rounded-lg border-2 transition-all text-left ${
                                                formData.theme === theme.value
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-border hover:border-primary/50'
                                            }`}
                                        >
                                            <div className="font-semibold">{theme.label}</div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                {theme.description}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </Container>

                    {/* SEO Settings */}
                    <Container delay={0.2}>
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Settings</CardTitle>
                                <CardDescription>
                                    Optimize your portfolio for search engines
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="metaTitle">Meta Title</Label>
                                    <Input
                                        id="metaTitle"
                                        value={formData.metaTitle}
                                        onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                                        placeholder="Your Portfolio - Creative Professional"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="metaDescription">Meta Description</Label>
                                    <Textarea
                                        id="metaDescription"
                                        value={formData.metaDescription}
                                        onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                                        placeholder="A compelling description for search engines..."
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Container>

                    {/* Publishing */}
                    <Container delay={0.3}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Publishing</CardTitle>
                                <CardDescription>
                                    Control your portfolio's visibility
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="isPublished">Publish Portfolio</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Make your portfolio visible to the public
                                        </p>
                                    </div>
                                    <Switch
                                        id="isPublished"
                                        checked={formData.isPublished}
                                        onCheckedChange={(checked) => handleInputChange('isPublished', checked)}
                                    />
                                </div>
                                {portfolio?.slug && (
                                    <div className="p-4 rounded-lg bg-muted">
                                        <div className="text-sm font-medium mb-1">Your Portfolio URL</div>
                                        <div className="flex items-center gap-2">
                                            <code className="text-sm font-mono">
                                                {typeof window !== 'undefined' ? window.location.origin : ''}/creator/{portfolio.slug}
                                            </code>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(
                                                        `${typeof window !== 'undefined' ? window.location.origin : ''}/creator/${portfolio.slug}`
                                                    );
                                                    toast.success("URL copied to clipboard!");
                                                }}
                                            >
                                                Copy
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </Container>
                </div>

                {/* Live Preview */}
                <div className="lg:col-span-5">
                    <Container delay={0.4}>
                        <Card className="sticky top-20">
                            <CardHeader>
                                <CardTitle>Live Preview</CardTitle>
                                <CardDescription>
                                    See your changes in real-time
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg overflow-hidden bg-background">
                                    <div className="aspect-[9/16] max-h-[600px] overflow-y-auto">
                                        {/* Preview Content */}
                                        <div className={`p-6 ${
                                            formData.theme === 'dark' ? 'bg-gray-900 text-white' :
                                            formData.theme === 'minimal' ? 'bg-white' :
                                            formData.theme === 'creative' ? 'bg-gradient-to-br from-purple-50 to-pink-50' :
                                            'bg-gray-50'
                                        }`}>
                                            {formData.coverImage && (
                                                <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
                                                    <img 
                                                        src={formData.coverImage} 
                                                        alt="Cover"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <h1 className="text-3xl font-bold mb-2">
                                                {formData.title || 'Your Portfolio Title'}
                                            </h1>
                                            {formData.description && (
                                                <p className="text-muted-foreground mb-6">
                                                    {formData.description}
                                                </p>
                                            )}
                                            <div className="space-y-4">
                                                <div className="p-4 rounded-lg bg-muted/50">
                                                    <div className="text-sm font-medium mb-1">Projects</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {portfolio?.projects?.length || 0} projects
                                                    </div>
                                                </div>
                                                <div className="p-4 rounded-lg bg-muted/50">
                                                    <div className="text-sm font-medium mb-1">Skills</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {portfolio?.skills?.length || 0} skills
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

