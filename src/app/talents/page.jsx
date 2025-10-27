import { CreatorsCarousel } from "@/components/marketing/creator-carousel"
import { Button } from "@/components/ui/button"
import { Search, Filter, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"

const Talents = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CreativeMarket
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Creators
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Categories
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                About
              </a>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                Join Now
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Discover Amazing Creators
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with talented creators, explore their portfolios, and collaborate on your next big project
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search creators, skills, or categories..."
                className="pl-12 pr-20 py-6 text-lg rounded-full border-2 border-purple-100 focus:border-purple-300"
              />
              <Button className="absolute right-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">50K+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">95%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators Carousel */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold mb-2">Featured Creators</h3>
              <p className="text-gray-600">Discover top-rated creators in various categories</p>
            </div>
            <Button variant="outline" className="hidden md:flex bg-transparent">
              <TrendingUp className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          <CreatorsCarousel />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Photography", icon: "📸", color: "from-blue-500 to-cyan-500" },
              { name: "Design", icon: "🎨", color: "from-purple-500 to-pink-500" },
              { name: "Video", icon: "🎬", color: "from-red-500 to-orange-500" },
              { name: "Writing", icon: "✍️", color: "from-green-500 to-teal-500" },
              { name: "Music", icon: "🎵", color: "from-indigo-500 to-purple-500" },
              { name: "Marketing", icon: "📈", color: "from-yellow-500 to-orange-500" },
            ].map((category) => (
              <div key={category.name} className="group cursor-pointer">
                <div
                  className={`bg-gradient-to-r ${category.color} rounded-2xl p-6 text-center text-white transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                >
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <div className="font-semibold">{category.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CM</span>
                </div>
                <span className="text-xl font-bold">CreativeMarket</span>
              </div>
              <p className="text-gray-400">Connecting creators with opportunities worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Creators</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Join as Creator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Creator Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Find Creators
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CreativeMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Talents