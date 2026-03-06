"use client"

import React, { useState } from 'react'
import { 
    DollarSign, 
    Music, 
    ShoppingBag, 
    Tag,
    Plus,
    Pencil,
    Eye,
    Download,
    TrendingUp,
    Image as ImageIcon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Container } from "@/components";
import { toast } from 'sonner';

const Page = () => {
    const [products, setProducts] = useState([
        {
            id: "1",
            title: "Midnight Dreams",
            type: "Single",
            status: "active",
            price: "$1.99",
            sales: "847",
            revenue: "$1679.53",
            formats: ["MP3", "WAV", "FLAC"],
            image: null,
        },
        {
            id: "2",
            title: "Summer Vibes EP",
            type: "EP",
            status: "active",
            price: "$4.99",
            sales: "234",
            revenue: "$1167.66",
            formats: ["MP3", "WAV"],
            image: null,
        },
        {
            id: "3",
            title: "Acoustic Sessions",
            type: "Album",
            status: "draft",
            price: "$9.99",
            sales: "156",
            revenue: "$1558.44",
            formats: ["MP3", "WAV", "FLAC"],
            image: null,
        },
    ]);

    const metrics = [
        {
            title: "Total Revenue",
            value: "$15,247",
            change: "+12.5%",
            icon: DollarSign,
            color: "text-green-500",
        },
        {
            title: "Music Sales",
            value: "1,237",
            change: "+8.3%",
            icon: Music,
            color: "text-blue-500",
        },
        {
            title: "Merchandise Sales",
            value: "490",
            change: "+15.7%",
            icon: ShoppingBag,
            color: "text-purple-500",
        },
        {
            title: "Active Products",
            value: "23",
            change: "+2 this week",
            icon: Tag,
            color: "text-orange-500",
        },
    ];

    const handleAddRelease = () => {
        toast.info("Add New Release dialog coming soon!");
    };

    const handleEdit = (productId: string) => {
        toast.info(`Editing ${products.find(p => p.id === productId)?.title}...`);
    };

    const handleView = (productId: string) => {
        toast.info(`Viewing ${products.find(p => p.id === productId)?.title}...`);
    };

    const handleDownload = (productId: string) => {
        toast.success(`Downloading ${products.find(p => p.id === productId)?.title}...`);
    };

    return (
        <div className="p-6 lg:p-8 w-full">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold mb-2">Music Store & Merchandise</h1>
                    <p className="text-muted-foreground text-lg">
                        Manage your digital music store and merchandise sales in one place.
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
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                        <span>{metric.change}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Container>
                    ))}
                </div>

                {/* Tabs */}
                <Tabs defaultValue="digital-music" className="w-full">
                    <TabsList>
                        <TabsTrigger value="digital-music">Digital Music</TabsTrigger>
                        <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="settings">Store Settings</TabsTrigger>
                    </TabsList>

                    {/* Digital Music Tab */}
                    <TabsContent value="digital-music" className="mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Digital Music Store</CardTitle>
                                        <CardDescription>
                                            Manage your music releases and digital downloads
                                        </CardDescription>
                                    </div>
                                    <Button onClick={handleAddRelease}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add New Release
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {products.map((product, index) => (
                                        <Container key={product.id} delay={index * 0.1}>
                                            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                                {/* Album Art Placeholder */}
                                                <div className="relative w-full aspect-square bg-muted flex items-center justify-center">
                                                    {product.image ? (
                                                        <img 
                                                            src={product.image} 
                                                            alt={product.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <ImageIcon className="h-16 w-16 text-muted-foreground" />
                                                    )}
                                                    <div className="absolute bottom-2 right-2">
                                                        <Badge 
                                                            variant={product.status === "active" ? "default" : "secondary"}
                                                            className={product.status === "active" ? "bg-black text-white" : ""}
                                                        >
                                                            {product.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                
                                                <CardContent className="p-4">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                                                            <p className="text-sm text-muted-foreground">{product.type}</p>
                                                        </div>
                                                        
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Price</span>
                                                                <span className="font-semibold">{product.price}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Sales</span>
                                                                <span className="font-medium">{product.sales}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Revenue</span>
                                                                <span className="font-medium">{product.revenue}</span>
                                                            </div>
                                                        </div>

                                                        {/* Formats */}
                                                        <div>
                                                            <p className="text-xs text-muted-foreground mb-2">Formats</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {product.formats.map((format) => (
                                                                    <Badge 
                                                                        key={format} 
                                                                        variant="outline" 
                                                                        className="text-xs"
                                                                    >
                                                                        {format}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex items-center gap-2 pt-2 border-t">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1"
                                                                onClick={() => handleEdit(product.id)}
                                                            >
                                                                <Pencil className="h-4 w-4 mr-1" />
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() => handleView(product.id)}
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() => handleDownload(product.id)}
                                                            >
                                                                <Download className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Container>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Merchandise Tab */}
                    <TabsContent value="merchandise" className="mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Merchandise</CardTitle>
                                        <CardDescription>
                                            Manage your physical and digital merchandise
                                        </CardDescription>
                                    </div>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Product
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No Merchandise Yet</h3>
                                    <p className="text-muted-foreground max-w-md mb-4">
                                        Start selling merchandise to your fans. Add t-shirts, posters, vinyl, and more.
                                    </p>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Your First Product
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Orders</CardTitle>
                                <CardDescription>
                                    View and manage customer orders
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        Orders from your store will appear here once customers start making purchases.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Store Settings Tab */}
                    <TabsContent value="settings" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Store Settings</CardTitle>
                                <CardDescription>
                                    Configure your store preferences and payment settings
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Tag className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Store Settings</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        Configure your store settings, payment methods, and shipping options.
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

