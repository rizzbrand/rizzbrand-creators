"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createAgencyApplication } from "@/lib/actions/agency-program";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function AgencyProgramApplyForm() {
  const [pending, setPending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");
  const [website, setWebsite] = useState("");
  const [goal, setGoal] = useState("");
  const [brandStage, setBrandStage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      await createAgencyApplication({
        name,
        email,
        socials: { instagram, tiktok, youtube, website },
        goal,
        brandStage,
      });
      toast.success("Application submitted. Create an account to track your progress.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="mt-1"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Use the same email you’ll use to create your account.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="instagram">Instagram (optional)</Label>
          <Input
            id="instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="https://instagram.com/you"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="tiktok">TikTok (optional)</Label>
          <Input
            id="tiktok"
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            placeholder="https://tiktok.com/@you"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="youtube">YouTube (optional)</Label>
          <Input
            id="youtube"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            placeholder="https://youtube.com/@you"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://your-site.com"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="goal">Why do you want to join?</Label>
        <Textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What are you building and what do you want help with?"
          rows={4}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="stage">Where is your brand today? (optional)</Label>
        <Input
          id="stage"
          value={brandStage}
          onChange={(e) => setBrandStage(e.target.value)}
          placeholder="e.g. 10k followers, $0 MRR, selling services, launching first product…"
          className="mt-1"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          After applying, you’ll need an account to view tasks and progress.
        </p>
        <div className="flex gap-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Apply"}
          </Button>
          <Button asChild type="button" variant="outline">
            <Link href="/auth/signup">Create account</Link>
          </Button>
        </div>
      </div>
    </form>
  );
}

