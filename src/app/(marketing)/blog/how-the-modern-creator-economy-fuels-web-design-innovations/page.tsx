import BlogHero from "@/components/blog/blog-hero"
import BlogSection from "@/components/blog/blog-section"
import CTA from "@/components/marketing/cta"
import Faq from "@/components/marketing/faq"
import { BLOGS } from '@/constants/blog'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, User, Clock, Share2, BookmarkPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const BlogPage = () => {
    
    return (

      <div className="max-w-4xl mx-auto py-16 px-4 lg:px-0">
        <h1 className="text-4xl font-extrabold mb-6 text-foreground">
          How the Modern Creator Economy Fuels Web Design Innovation
        </h1>
  

   {/* Back Navigation */}
   <article className="container mx-auto px-4 py-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Insights
        </Link>
      </article>

      {/* Article Header */}
      <article className="container mx-auto px-4 max-w-4xl">
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">
           RCA
          </Badge>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center text-muted-foreground">
              <User className="w-5 h-5 mr-2" />
              <span className="mr-6"> Divine Gabriel</span>
              <Calendar className="w-5 h-5 mr-2" />
              <span className="mr-6">29-09-25</span>
              <Clock className="w-5 h-5 mr-2" />
              <span>21:06</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </header>
        </article>

        <img
          src="/images/blog1.jpeg"
          alt="Creator economy web design"
          className="rounded-2xl mb-8 shadow-lg"
        />
  
        <article className="prose prose-lg prose-neutral max-w-none">
          <p>
            The creator economy isn’t just reshaping how individuals earn —
            it’s driving massive innovation in web design. As creators move
            away from relying on platforms and build independent digital
            empires, websites have become their storefronts, communities,
            and personal brands.
          </p> <br />

          <h2>1. Subscription-Friendly Websites</h2>
          <p>
            Platforms like Patreon and Substack have shown that creators
            thrive on membership models. But owning the website means
            complete control. That’s why sleek, **subscription-ready web
            designs** are in high demand — from paywalled content to VIP
            communities.
          </p> <br />
  
          <blockquote>
            “In today’s creator economy, your website isn’t just a portfolio —
            it’s a revenue engine.”
          </blockquote> <br />
  
          <h2>2. Branded Experiences That Convert</h2>
          <p>
            Creators now launch their own products, workshops, and digital
            services. This shift requires websites designed not just for
            aesthetics but for **conversion funnels** — bold CTAs, smart
            landing pages, and intuitive checkout flows.
          </p> <br />
  
          <h2>3. Your Agency as the Architect</h2>
          <p>
            At our 360° digital creators agency, we specialize in designing
            these experiences — blending beautiful design with monetization
            features, so creators can scale their brands confidently.
          </p><br />
  
          <hr /> <br />
  
          <h2 className="text-primary">Final Thoughts</h2> <br />
          <p>
            The creator economy is booming, and the creators who invest in
            owning their digital spaces will lead the next wave. Our team is
            here to help build websites that don’t just look good, but work
            as powerful business platforms.
          </p>
        </article>
      </div>
    );
  }
  

export default BlogPage 