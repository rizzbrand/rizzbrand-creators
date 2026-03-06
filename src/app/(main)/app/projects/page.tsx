/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from "@/components";
import { getOrCreatePortfolio, createProject, deleteProject } from '@/lib/actions/portfolio';
import { toast } from 'sonner';
import { PlusIcon, BriefcaseIcon, TrashIcon, EditIcon, EyeIcon } from 'lucide-react';
import Link from 'next/link';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const Page = () => {
    const [portfolio, setPortfolio] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        coverImage: '',
        tags: [] as string[],
        images: [] as string[],
        technologies: [] as string[],
        status: 'draft' as 'draft' | 'published' | 'archived',
        featured: false,
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
            await createProject(formData);
            toast.success("Project created successfully!");
            setDialogOpen(false);
            setFormData({
                title: '',
                description: '',
                coverImage: '',
                tags: [],
                images: [],
                technologies: [],
                status: 'draft',
                featured: false,
            });
            loadPortfolio();
        } catch (error) {
            console.error("Error creating project:", error);
            toast.error("Failed to create project");
        }
    };

    const handleDelete = async (projectId: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteProject(projectId);
            toast.success("Project deleted successfully!");
            loadPortfolio();
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project");
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
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Projects</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your portfolio projects
                        </p>
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon className="h-4 w-4 mr-2" />
                                New Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Create New Project</DialogTitle>
                                <DialogDescription>
                                    Add a new project to your portfolio
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Project Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="coverImage">Cover Image URL</Label>
                                    <Input
                                        id="coverImage"
                                        value={formData.coverImage}
                                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                        type="url"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="rounded border-gray-300"
                                    />
                                    <Label htmlFor="featured">Featured Project</Label>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Create Project</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Projects Grid */}
                {portfolio?.projects && portfolio.projects.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {portfolio.projects.map((project: any) => (
                            <Container key={project.id}>
                                <Card className="group hover:shadow-lg transition-shadow">
                                    {project.coverImage && (
                                        <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                                            <img 
                                                src={project.coverImage} 
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg">{project.title}</CardTitle>
                                            <Badge variant={
                                                project.status === 'published' ? 'default' :
                                                project.status === 'draft' ? 'secondary' : 'outline'
                                            }>
                                                {project.status}
                                            </Badge>
                                        </div>
                                        {project.description && (
                                            <CardDescription className="line-clamp-2">
                                                {project.description}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/app/projects/${project.id}`}>
                                                    <EditIcon className="h-4 w-4 mr-1" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={() => handleDelete(project.id)}
                                            >
                                                <TrashIcon className="h-4 w-4 mr-1" />
                                                Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Container>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <BriefcaseIcon className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                Get started by creating your first project
                            </p>
                            <Button onClick={() => setDialogOpen(true)}>
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Create Project
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
};

export default Page

