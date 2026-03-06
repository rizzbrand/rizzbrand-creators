import { Background, Container, Footer, Navbar, Wrapper } from "@/components";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Rizzbrand Studio.",
};

export default function PrivacyPage() {
  return (
    <Background>
      <Navbar />
      <Wrapper className="py-16 md:py-24 min-h-screen">
        <Container className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: March 6, 2025
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
              <p>
                Rizzbrand Studio (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This policy describes how we collect, use, and protect your information when you use our website, services, or communicate with us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
              <p className="mb-3">We may collect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Contact information</strong> — Name, email, and other details you provide when filling out forms (e.g., Work with us, support inquiries).</li>
                <li><strong className="text-foreground">Usage data</strong> — How you interact with our website, including pages visited and general analytics.</li>
                <li><strong className="text-foreground">Cookies and similar technologies</strong> — See our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link> for details.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Respond to inquiries and provide support</li>
                <li>Process project requests and communicate about services</li>
                <li>Improve our website and services</li>
                <li>Send relevant updates (with your consent, where required)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Sharing Your Information</h2>
              <p>
                We do not sell your personal information. We may share data with service providers (e.g., hosting, email) who assist our operations, under strict confidentiality. We may disclose information when required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Retention</h2>
              <p>
                We retain your information only as long as needed to fulfill the purposes described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
              <p>
                Depending on your location, you may have rights to access, correct, delete, or restrict processing of your data. Contact us at{" "}
                <a href="mailto:hey@rizzbrands.site" className="text-primary hover:underline">hey@rizzbrands.site</a> to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Changes</h2>
              <p>
                We may update this policy from time to time. The &quot;Last updated&quot; date at the top reflects the most recent version. Continued use of our services after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact</h2>
              <p>
                For privacy-related questions, contact us at{" "}
                <a href="mailto:hey@rizzbrands.site" className="text-primary hover:underline">hey@rizzbrands.site</a>.
              </p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
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
