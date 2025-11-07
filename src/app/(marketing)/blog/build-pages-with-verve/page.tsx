import Image from "next/image";

const BlogPage = () => {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 lg:px-0">
        <h1 className="text-4xl font-extrabold mb-6 text-foreground">
          Harnessing AI Tools for 360° Digital Creation
        </h1>
  
      <Image
        src="https://source.unsplash.com/1200x600/?ai,technology"
        alt="AI digital creation"
        width={1200}
        height={600}
        className="rounded-2xl mb-8 shadow-lg object-cover"
      />
   
  
        <article className="prose prose-lg prose-neutral max-w-none">
          <p>
            Artificial Intelligence has become more than a buzzword — it’s a
            creative partner. From generating scripts to designing visuals,
            AI is changing how creators and agencies produce content at
            scale.
          </p> <br />
  
          <h2>1. AI for Content & Copywriting</h2>
          <p>
            Tools like ChatGPT and Jasper AI help creators brainstorm,
            outline, and polish content. This means faster workflows and
            fewer creative roadblocks.
          </p>
          <br />
          <h2>2. AI for Visuals & Branding</h2>
          <p>
            MidJourney and Stable Diffusion are now part of the creative
            toolkit — generating branded graphics, campaign imagery, and even
            moodboards in seconds.
          </p><br />
  
          <h2>3. Video Creation Made Scalable</h2>
          <p>
            Platforms like Synthesia allow businesses and creators to launch
            **AI-powered videos with avatars**, cutting production costs
            while maintaining professional quality.
          </p>
  
          <div className="p-6 bg-muted rounded-xl my-6">
            <h3 className="font-semibold">Our Edge</h3>
            <p>
              At our agency, we integrate AI workflows into web design,
              branding, and marketing campaigns — so you get efficiency,
              innovation, and impact, all at once.
            </p>
          </div>
  
          <h2 className="text-primary">Conclusion</h2>
          <p>
            AI doesn’t replace human creativity — it amplifies it. By
            combining AI with expert strategy, we deliver campaigns that
            stand out in a crowded digital landscape.
          </p>
        </article>
      </div>
    );
  }
  export default BlogPage 