"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from "@/components";
import { getOrCreatePortfolio, createSkill, deleteSkill } from '@/lib/actions/portfolio';
import { toast } from 'sonner';
import { PlusIcon, SparklesIcon, TrashIcon, EditIcon } from 'lucide-react';
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
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

const Page = () => {
    const [portfolio, setPortfolio] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        level: 50,
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
            await createSkill(formData);
            toast.success("Skill created successfully!");
            setDialogOpen(false);
            setFormData({
                name: '',
                category: '',
                level: 50,
                isVisible: true,
            });
            loadPortfolio();
        } catch (error) {
            console.error("Error creating skill:", error);
            toast.error("Failed to create skill");
        }
    };

    const handleDelete = async (skillId: string) => {
        if (!confirm("Are you sure you want to delete this skill?")) return;
        try {
            await deleteSkill(skillId);
            toast.success("Skill deleted successfully!");
            loadPortfolio();
        } catch (error) {
            console.error("Error deleting skill:", error);
            toast.error("Failed to delete skill");
        }
    };

    if (loading) {
        return (
            <div className="p-4 w-full flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const skillsByCategory = portfolio?.skills?.reduce((acc: any, skill: any) => {
        const category = skill.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
    }, {}) || {};

    return (
        <div className="p-4 md:p-6 lg:p-8 w-full">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Skills</h1>
                        <p className="text-muted-foreground mt-1">
                            Showcase your expertise and abilities
                        </p>
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Add Skill
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Skill</DialogTitle>
                                <DialogDescription>
                                    Add a skill to showcase your expertise
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Skill Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g., Frontend, Design, Backend"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="level">Proficiency Level: {formData.level}%</Label>
                                    <Slider
                                        id="level"
                                        value={[formData.level]}
                                        onValueChange={(value) => setFormData({ ...formData, level: value[0] })}
                                        min={0}
                                        max={100}
                                        step={5}
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
                                    <Button type="submit">Add Skill</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Skills by Category */}
                {Object.keys(skillsByCategory).length > 0 ? (
                    <div className="space-y-6">
                        {Object.entries(skillsByCategory).map(([category, skills]: [string, any]) => (
                            <Container key={category}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{category}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {skills.map((skill: any) => (
                                                <div key={skill.id} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <SparklesIcon className="h-4 w-4 text-primary" />
                                                            <span className="font-medium">{skill.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm text-muted-foreground">
                                                                {skill.level}%
                                                            </span>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDelete(skill.id)}
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <Progress value={skill.level} className="h-2" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Container>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <SparklesIcon className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No skills yet</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                Add your skills to showcase your expertise
                            </p>
                            <Button onClick={() => setDialogOpen(true)}>
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Add Skill
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
};

export default Page

