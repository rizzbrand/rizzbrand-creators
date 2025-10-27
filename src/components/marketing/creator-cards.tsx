import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Users, CheckCircle, Heart, Share2 } from "lucide-react"

interface Creator {
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
}

interface CreatorCardProps {
  creator: Creator
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg">
      <div className="relative">
        <Image
          src={creator.coverImage || "/placeholder.svg"}
          alt={`${creator.name}'s portfolio`}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button size="icon" variant="secondary" className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="secondary" className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          {creator.category}
        </Badge>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 border-2 border-white shadow-md">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
              <AvatarFallback>
                {creator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg">{creator.name}</h3>
                {creator.isVerified && (
                  <div className="relative">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <div className="absolute inset-0 bg-blue-500 rounded-full -z-10"></div>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-sm">{creator.username}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{creator.rating}</span>
            <span>({creator.reviews})</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{creator.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{creator.followers}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {creator.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Starting at</span>
            <div className="text-xl font-bold text-green-600">${creator.startingPrice}</div>
          </div>
          <Link href={`/creator/${creator.id}`}>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
