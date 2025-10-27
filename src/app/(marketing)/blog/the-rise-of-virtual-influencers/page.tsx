

import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Clock, Share2, BookmarkPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"




export default function VirtualInfluencers() {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 lg:px-0">
        <h1 className="text-4xl font-extrabold mb-6 text-foreground">
          The Rise of Virtual Influencers & What It Means for Brand Design
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
          src="/images/blog2.jpeg"
          alt="Virtual influencers"
          className="rounded-2xl mb-8 shadow-lg"
        />
  
        <article className="prose prose-lg prose-neutral max-w-none">
          <p>
            Virtual influencers — digital personas powered by AI and CGI —
            are transforming the way brands engage with audiences. They’re
            controlled, scalable, and surprisingly relatable.
          </p> <br />
  
          <h2><b>1. Why Virtual Influencers Work </b></h2> <br />
          <p> 
            Unlike traditional influencers, brands have full creative control
            over these avatars. They never get tired, and they embody brand
            values flawlessly.
          </p> <br />
  
          <h2> <b>2. Opportunities for Brands </b></h2>
          <p><br />
            From fashion to tech, virtual influencers are already driving
            campaigns. They allow brands to experiment with futuristic
            narratives while reducing risks.
          </p> <br />
  
          <h2><b>3. Our Role in Designing Them </b></h2> <br />
          <p>
            Our agency creates **digital-first brand identities**. This
            includes everything from building visual personas to designing
            immersive campaigns around them.
          </p>
  
          <div className="p-6 bg-muted rounded-xl my-6">
            <h3 className="font-semibold">Future-Proof Your Brand</h3>
            <p>
              Virtual influencers aren’t just a trend — they’re the future of
              storytelling. Let’s craft one that aligns with your vision.
            </p>
          </div>
  
          <h2 className="text-primary">Final Word</h2> <br />
          <p>
            The digital world is blurring the line between real and virtual.
            By embracing virtual influencers now, your brand stays ahead of
            the curve.
          </p>
        </article>
      </div>
    );
  }
  