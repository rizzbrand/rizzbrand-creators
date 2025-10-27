"use client"

import { useState } from "react"
import { CreatorCard } from "@/components/marketing/creator-cards"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const creators = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarahj_photo",
    category: "Photography",
    rating: 4.9,
    reviews: 127,
    avatar: "/images/creator1.jpg",
    coverImage: "/images/creator1.jpg",
    isVerified: true,
    location: "New York, USA",
    startingPrice: 150,
    tags: ["Portrait", "Wedding", "Commercial"],
    followers: "12.5K",
  },
  {
    id: 2,
    name: "Alex Chen",
    username: "@alexdesigns",
    category: "UI/UX Design",
    rating: 4.8,
    reviews: 89,
    avatar: "/placeholder.svg?height=100&width=100&text=AC",
    coverImage: "/placeholder.svg?height=200&width=300&text=Design+Portfolio",
    isVerified: true,
    location: "San Francisco, USA",
    startingPrice: 200,
    tags: ["Mobile", "Web", "Branding"],
    followers: "8.3K",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    username: "@maria_creates",
    category: "Content Creation",
    rating: 4.9,
    reviews: 156,
    avatar: "/images/creator3.jpg",
    coverImage: "/images/creator3.jpg",
    isVerified: true,
    location: "Los Angeles, USA",
    startingPrice: 100,
    tags: ["Social Media", "Video", "Copywriting"],
    followers: "25.1K",
  },
  {
    id: 4,
    name: "David Kim",
    username: "@davidfilms",
    category: "Video Production",
    rating: 4.7,
    reviews: 73,
    avatar: "/placeholder.svg?height=100&width=100&text=DK",
    coverImage: "/placeholder.svg?height=200&width=300&text=Video+Production",
    isVerified: false,
    location: "Austin, USA",
    startingPrice: 300,
    tags: ["Commercial", "Documentary", "Music Videos"],
    followers: "5.7K",
  },
  {
    id: 5,
    name: "Emma Thompson",
    username: "@emma_writes",
    category: "Copywriting",
    rating: 4.8,
    reviews: 94,
    avatar: "/placeholder.svg?height=100&width=100&text=ET",
    coverImage: "/placeholder.svg?height=200&width=300&text=Writing+Portfolio",
    isVerified: true,
    location: "London, UK",
    startingPrice: 80,
    tags: ["Marketing", "Blog Posts", "Email"],
    followers: "6.9K",
  },
  {
    id: 6,
    name: "James Wilson",
    username: "@jamesgraphics",
    category: "Graphic Design",
    rating: 4.6,
    reviews: 112,
    avatar: "/placeholder.svg?height=100&width=100&text=JW",
    coverImage: "/placeholder.svg?height=200&width=300&text=Graphic+Design",
    isVerified: true,
    location: "Toronto, Canada",
    startingPrice: 120,
    tags: ["Logo", "Print", "Illustration"],
    followers: "9.2K",
  },
]

export function CreatorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= creators.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, creators.length - itemsPerView) : prev - 1))
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {creators.map((creator) => (
            <div key={creator.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
              <CreatorCard creator={creator} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white z-10"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white z-10"
        onClick={nextSlide}
        disabled={currentIndex + itemsPerView >= creators.length}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(creators.length / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              Math.floor(currentIndex / itemsPerView) === index ? "bg-purple-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index * itemsPerView)}
          />
        ))}
      </div>
    </div>
  )
}
