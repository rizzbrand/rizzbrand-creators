"use client";

import { authClient } from "@/lib/auth-client";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container, Wrapper } from "@/components";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setImage(user.image ?? null);
    }
  }, [user]);

  if (!user) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim() || undefined,
        image: image ?? undefined,
      });
      if (error) {
        toast.error(error.message ?? "Failed to update profile");
      } else {
        toast.success("Profile updated");
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setPending(false);
    }
  }

  return (
    <Wrapper className="min-h-screen py-8 md:py-12">
      <Container className="mx-auto max-w-xl">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            Settings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your account and preferences.
          </p>
        </div>

        <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
          <h2 className="text-lg font-medium">User profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Update your name and profile picture.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <AvatarUpload
                value={image}
                onChange={setImage}
                size="lg"
              />
              <div className="flex-1 space-y-2 sm:w-full">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </form>
        </section>
      </Container>
    </Wrapper>
  );
}
