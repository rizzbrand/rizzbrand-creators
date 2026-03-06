"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from "@/components";
import { getOrCreatePortfolio } from '@/lib/actions/portfolio';
import { toast } from 'sonner';
import { GlobeIcon, CopyIcon, ExternalLinkIcon, EyeIcon } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
    const [portfolio, setPortfolio] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        loadPortfolio();
    }, []);

    if (loading) {
        return (
            <div className="p-4 w-full flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const portfolioUrl = portfolio?.slug 
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}/creator/${portfolio.slug}`
        : '';

    return (
        <div className="p-4 md:p-6 lg:p-8 w-full">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Portfolio Preview</h1>
                        <p className="text-muted-foreground mt-1">
                            Preview and share your portfolio
                        </p>
                    </div>
                    {portfolioUrl && (
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    navigator.clipboard.writeText(portfolioUrl);
                                    toast.success("URL copied to clipboard!");
                                }}
                            >
                                <CopyIcon className="h-4 w-4 mr-2" />
                                Copy Link
                            </Button>
                            <Button asChild>
                                <Link href={portfolioUrl} target="_blank">
                                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                                    Open Live
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Preview Frame */}
                {portfolioUrl ? (
                    <Container>
                        <Card>
                            <CardContent className="p-0">
                                <div className="border rounded-lg overflow-hidden bg-background">
                                    <div className="aspect-video w-full bg-muted flex items-center justify-center">
                                        <iframe
                                            src={portfolioUrl}
                                            className="w-full h-full min-h-[600px]"
                                            title="Portfolio Preview"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Container>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <EyeIcon className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Portfolio not ready</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                Complete your portfolio setup to preview it
                            </p>
                            <Button asChild>
                                <Link href="/app/portfolio">
                                    Setup Portfolio
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Portfolio Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Container>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Views</p>
                                        <p className="text-2xl font-bold">{portfolio?.viewCount || 0}</p>
                                    </div>
                                    <EyeIcon className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.1}>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Projects</p>
                                        <p className="text-2xl font-bold">{portfolio?.projects?.length || 0}</p>
                                    </div>
                                    <GlobeIcon className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.2}>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <p className={`text-2xl font-bold ${portfolio?.isPublished ? 'text-green-500' : 'text-yellow-500'}`}>
                                            {portfolio?.isPublished ? 'Published' : 'Draft'}
                                        </p>
                                    </div>
                                    <GlobeIcon className="h-8 w-8 text-muted-foreground" />
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

