import { Background, Container, Footer, Navbar, Wrapper } from "@/components";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for Rizzbrand Studio.",
};

export default function TermsPage() {
  return (
    <Background>
      <Navbar />
      <Wrapper className="py-16 md:py-24 min-h-screen">
        <Container className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: March 6, 2025
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Agreement</h2>
              <p>
                By accessing or using Rizzbrand Studio&apos;s website and services (&quot;Services&quot;), you agree to these Terms of Service. If you do not agree, do not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Our Services</h2>
              <p>
                Rizzbrand Studio is a full-service studio that helps creators, agencies, and brands build products, launch brands, and develop software and AI solutions. Our Services include web and app development, AI automation, product design, and related consulting.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Use of Services</h2>
              <p className="mb-3">You agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate information when contacting us or submitting requests</li>
                <li>Use our website and Services only for lawful purposes</li>
                <li>Not interfere with or disrupt our Services or systems</li>
                <li>Not use our Services to infringe on others&apos; rights or violate applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Project Agreements</h2>
              <p>
                Specific projects are governed by separate agreements (e.g., statements of work, contracts) that define scope, deliverables, timelines, and payment terms. These Terms apply to the general use of our website and initial inquiries unless otherwise specified.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Intellectual Property</h2>
              <p>
                Our website, branding, and pre-existing materials remain our property. For projects, intellectual property rights are typically addressed in the project agreement. Unless otherwise agreed in writing, we retain rights to our methodologies, tools, and general know-how.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Disclaimer</h2>
              <p>
                Our Services are provided &quot;as is.&quot; We do not guarantee specific outcomes, and results depend on many factors. We are not liable for indirect, incidental, or consequential damages arising from your use of our Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, our total liability for any claims arising from these Terms or our Services shall not exceed the amount you paid us for the specific service giving rise to the claim (or, if no payment was made, zero).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Termination</h2>
              <p>
                We may suspend or terminate your access to our website or Services at any time, with or without cause. Project-specific termination is governed by the relevant project agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes</h2>
              <p>
                We may update these Terms from time to time. The &quot;Last updated&quot; date reflects the most recent version. Continued use of our Services after changes constitutes acceptance. Material changes may be communicated via email or a notice on our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the jurisdiction in which Rizzbrand Studio operates, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact</h2>
              <p>
                For questions about these Terms, contact us at{" "}
                <a href="mailto:hey@rizzbrands.site" className="text-primary hover:underline">hey@rizzbrands.site</a>.
              </p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to home
            </Link>
          </div>
        </Container>
      </Wrapper>
      <Footer />
    </Background>
  );
}
