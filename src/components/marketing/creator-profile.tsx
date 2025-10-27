"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  MapPin,
  Users,
  CheckCircle,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  Clock,
  Globe,
  Award,
  Package,
  ArrowLeft,
  ExternalLink,
  Check,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  LinkIcon as WebsiteIcon,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CreatorProfileProps {
  creator: {
    id: number
    name: string
    username: string
    category: string
    rating: number
    reviews: number
    avatar: string
    coverImage: string
    isVerified: boolean
    location: string
    startingPrice: number
    tags: string[]
    followers: string
    following: string
    bio: string
    joinedDate: string
    responseTime: string
    languages: string[]
    socialLinks: {
      instagram?: string
      twitter?: string
      linkedin?: string
      youtube?: string
      website?: string
      dribbble?: string
      behance?: string
      vimeo?: string
      tiktok?: string
      medium?: string
    }
    portfolio: Array<{
      id: number
      title: string
      image: string
      category: string
      likes: number
      isLiked: boolean
    }>
    collaborations: Array<{
      brand: string
      project: string
      image: string
    }>
    brandDeals: Array<{
      brand: string
      type: string
      status: string
    }>
    packages: Array<{
      name: string
      price: number
      duration: string
      deliverables: string[]
      turnaround: string
    }>
  }
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [portfolioLikes, setPortfolioLikes] = useState(
    creator.portfolio.reduce(
      (acc, item) => {
        acc[item.id] = { likes: item.likes, isLiked: item.isLiked }
        return acc
      },
      {} as Record<number, { likes: number; isLiked: boolean }>,
    ),
  )

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: `You are ${isFollowing ? "no longer following" : "now following"} ${creator.name}`,
    })
  }

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/creator/${creator.id}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${creator.name} - ${creator.category}`,
          text: `Check out ${creator.name}'s profile on CreativeMarket`,
          url: profileUrl,
        })
      } catch (error) {
        // Fallback to copy to clipboard
        copyToClipboard(profileUrl)
      }
    } else {
      copyToClipboard(profileUrl)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to your clipboard.",
      })
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually from the address bar.",
        variant: "destructive",
      })
    }
  }

  const handlePortfolioLike = (portfolioId: number) => {
    setPortfolioLikes((prev) => ({
      ...prev,
      [portfolioId]: {
        likes: prev[portfolioId].isLiked ? prev[portfolioId].likes - 1 : prev[portfolioId].likes + 1,
        isLiked: !prev[portfolioId].isLiked,
      },
    }))
  }

  const handlePortfolioShare = async (portfolioItem: any) => {
    const shareUrl = `${window.location.origin}/creator/${creator.id}/portfolio/${portfolioItem.id}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: portfolioItem.title,
          text: `Check out "${portfolioItem.title}" by ${creator.name}`,
          url: shareUrl,
        })
      } catch (error) {
        copyToClipboard(shareUrl)
      }
    } else {
      copyToClipboard(shareUrl)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Marketplace</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
                {isCopied ? "Copied!" : "Share Profile"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <Image
          src={creator.coverImage || "/placeholder.svg"}
          alt={`${creator.name}'s cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Section */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
              <AvatarFallback className="text-2xl">
                {creator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{creator.name}</h1>
                {creator.isVerified && (
                  <div className="relative flex items-center justify-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-lg mb-2">{creator.username}</p>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-4">{creator.category}</Badge>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{creator.rating}</span>
                  <span>({creator.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{creator.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{creator.followers} followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {creator.joinedDate}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 max-w-2xl">{creator.bio}</p>

              {/* Social Media Links */}
              <div className="flex items-center space-x-4 mb-6">
                {creator.socialLinks.instagram && (
                  <a
                    href={creator.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {creator.socialLinks.twitter && (
                  <a
                    href={creator.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-400 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {creator.socialLinks.linkedin && (
                  <a
                    href={creator.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {creator.socialLinks.youtube && (
                  <a
                    href={creator.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
                {creator.socialLinks.website && (
                  <a
                    href={creator.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <WebsiteIcon className="w-5 h-5" />
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {creator.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                onClick={handleFollow}
                variant={isFollowing ? "outline" : "default"}
                className={!isFollowing ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
              >
                <Users className="w-4 h-4 mr-2" />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{creator.followers}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">{creator.following}</div>
              <div className="text-sm text-gray-600">Following</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{creator.reviews}</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">${creator.startingPrice}+</div>
              <div className="text-sm text-gray-600">Starting Price</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creator.portfolio.map((item) => (
                  <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 left-2 bg-black/70 text-white">{item.category}</Badge>
                      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                          onClick={() => handlePortfolioLike(item.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${portfolioLikes[item.id]?.isLiked ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                          onClick={() => handlePortfolioShare(item)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{portfolioLikes[item.id]?.likes || item.likes}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {creator.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">{creator.bio}</p>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-2">Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          {creator.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {creator.languages.map((language) => (
                            <Badge key={language} variant="secondary">
                              <Globe className="w-3 h-3 mr-1" />
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">Response Time</div>
                          <div className="text-sm text-gray-600">{creator.responseTime}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">Member Since</div>
                          <div className="text-sm text-gray-600">{creator.joinedDate}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">Location</div>
                          <div className="text-sm text-gray-600">{creator.location}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="packages" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creator.packages.map((pkg, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    {index === 1 && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600">
                        Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{pkg.name}</span>
                        <span className="text-2xl font-bold text-green-600">${pkg.price}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{pkg.duration}</span>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">What's included:</h4>
                        <ul className="space-y-1 text-sm">
                          {pkg.deliverables.map((item, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <Check className="w-4 h-4 text-green-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-sm text-gray-600">
                        <strong>Turnaround:</strong> {pkg.turnaround}
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                        <Package className="w-4 h-4 mr-2" />
                        Select Package
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="collaborations" className="mt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Recent Collaborations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creator.collaborations.map((collab, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <Image
                              src={collab.image || "/placeholder.svg"}
                              alt={collab.brand}
                              width={60}
                              height={60}
                              className="rounded-lg"
                            />
                            <div>
                              <h4 className="font-semibold">{collab.brand}</h4>
                              <p className="text-sm text-gray-600">{collab.project}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-4">Brand Partnerships</h3>
                  <div className="space-y-4">
                    {creator.brandDeals.map((deal, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Award className="w-8 h-8 text-purple-600" />
                              <div>
                                <h4 className="font-semibold">{deal.brand}</h4>
                                <p className="text-sm text-gray-600">{deal.type}</p>
                              </div>
                            </div>
                            <Badge variant={deal.status === "Active" ? "default" : "secondary"}>{deal.status}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
