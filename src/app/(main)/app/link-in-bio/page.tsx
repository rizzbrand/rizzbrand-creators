"use client";

import Image from "next/image";
import { Container, Wrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import {
  getLinkInBio,
  updateLinkInBio,
  addLink,
  updateLink,
  deleteLink,
  reorderLinks,
} from "@/lib/actions/link-in-bio";
import {
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type LinkInBioWithLinks = Awaited<ReturnType<typeof getLinkInBio>>;

function AddLinkForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    setPending(true);
    try {
      await addLink({ title: title.trim(), url: url.trim() });
      setTitle("");
      setUrl("");
      onSuccess();
      toast.success("Link added");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add link");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <Input
        placeholder="Link title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />
      <Input
        placeholder="https://..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="url"
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={pending} className="shrink-0">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
}

function LinkItem({
  link,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: {
  link: NonNullable<LinkInBioWithLinks>["links"][0];
  onUpdate: (id: string, title: string, url: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);

  useEffect(() => {
    setTitle(link.title);
    setUrl(link.url);
  }, [link.title, link.url]);

  async function handleSave() {
    if (title.trim() && url.trim()) {
      await onUpdate(link.id, title.trim(), url.trim());
      setEditing(false);
      toast.success("Link updated");
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/20">
      <div className="flex flex-col gap-0.5">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={!canMoveUp}
          className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={!canMoveDown}
          className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      {editing ? (
        <div className="flex flex-1 flex-col gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            type="url"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setTitle(link.title);
                setUrl(link.url);
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">{link.title}</p>
            <p className="truncate text-xs text-muted-foreground">{link.url}</p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEditing(true)}
            className="shrink-0"
          >
            Edit
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={async () => {
              await onDelete(link.id);
              toast.success("Link removed");
            }}
            className="shrink-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}

export default function LinkInBioPage() {
  const [data, setData] = useState<LinkInBioWithLinks | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getLinkInBio().then(setData).finally(() => setPending(false));
  }, []);

  async function refresh() {
    setData(await getLinkInBio());
  }

  async function handleMoveUp(index: number) {
    if (!data || index <= 0) return;
    const links = [...data.links];
    [links[index - 1], links[index]] = [links[index], links[index - 1]];
    await reorderLinks(links.map((l) => l.id));
    refresh();
  }

  async function handleMoveDown(index: number) {
    if (!data || index >= data.links.length - 1) return;
    const links = [...data.links];
    [links[index], links[index + 1]] = [links[index + 1], links[index]];
    await reorderLinks(links.map((l) => l.id));
    refresh();
  }

  if (pending || !data) {
    return (
      <Wrapper className="min-h-screen py-8">
        <Container className="mx-auto max-w-3xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 rounded bg-muted" />
            <div className="h-32 rounded bg-muted" />
          </div>
        </Container>
      </Wrapper>
    );
  }

  const publicUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/l/${data.slug}`;

  return (
    <Wrapper className="min-h-screen py-8 md:py-12">
      <Container className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold md:text-3xl">
              Link in Bio
            </h1>
            <p className="mt-1 text-muted-foreground">
              One link for all your content. Share it in your bio.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(publicUrl);
                toast.success("Link copied to clipboard");
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy link
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={`/l/${data.slug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Preview
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="order-2 space-y-8 lg:order-1">
            {/* Profile — avatar + name + bio */}
            <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
              <h2 className="mb-6 font-medium">Profile</h2>
              <ProfileForm data={data} onSuccess={refresh} />
            </section>

            {/* Appearance */}
            <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
            <h2 className="mb-6 font-medium">Appearance</h2>
            <AppearanceForm data={data} onSuccess={refresh} />
            </section>

            {/* Links */}
            <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
              <h2 className="mb-6 font-medium">Links</h2>
              <AddLinkForm onSuccess={refresh} />
              <div className="mt-4 space-y-2">
                {data.links.map((link, index) => (
                  <LinkItem
                    key={link.id}
                    link={link}
                    onUpdate={async (id, title, url) => {
                      await updateLink(id, { title, url });
                      refresh();
                    }}
                    onDelete={deleteLink}
                    onMoveUp={() => handleMoveUp(index)}
                    onMoveDown={() => handleMoveDown(index)}
                    canMoveUp={index > 0}
                    canMoveDown={index < data.links.length - 1}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Live preview */}
          <aside className="order-1 self-start lg:sticky lg:top-24 lg:order-2">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Preview</p>
            <div
              className="overflow-hidden rounded-2xl border border-border shadow-xl"
              style={{ backgroundColor: data.backgroundColor || "#0a0a0a" }}
            >
              <div className="p-6 pb-4">
                <div className="flex flex-col items-center text-center">
                  {data.avatarUrl ? (
                    <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={data.avatarUrl}
                        alt={data.displayName || "Avatar"}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white">
                      {(data.displayName || "?")[0]}
                    </div>
                  )}
                  <p className="text-sm font-medium text-white">
                    {data.displayName || "Your Name"}
                  </p>
                  {data.bio && (
                    <p className="mt-1 line-clamp-2 text-xs text-white/80">
                      {data.bio}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2 px-4 pb-4">
                {data.links.slice(0, 4).map((link) => (
                  <div
                    key={link.id}
                    className="rounded-lg px-3 py-2 text-center text-xs font-medium"
                    style={{
                      backgroundColor: data.buttonColor || "#ffffff",
                      color: data.buttonTextColor || "#0a0a0a",
                    }}
                  >
                    {link.title}
                  </div>
                ))}
                {data.links.length > 4 && (
                  <p className="text-center text-xs text-white/50">
                    +{data.links.length - 4} more
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Wrapper>
  );
}

function ProfileForm({
  data,
  onSuccess,
}: {
  data: NonNullable<LinkInBioWithLinks>;
  onSuccess: () => void;
}) {
  const [displayName, setDisplayName] = useState(data.displayName ?? "");
  const [bio, setBio] = useState(data.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(data.avatarUrl ?? "");
  const [slug, setSlug] = useState(data.slug ?? "");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setDisplayName(data.displayName ?? "");
    setBio(data.bio ?? "");
    setAvatarUrl(data.avatarUrl ?? "");
    setSlug(data.slug ?? "");
  }, [data.displayName, data.bio, data.avatarUrl, data.slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      await updateLinkInBio({
        displayName,
        bio,
        avatarUrl: avatarUrl || undefined,
        slug: slug.trim() || undefined,
      });
      onSuccess();
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Label>Avatar</Label>
          <AvatarUpload
            value={avatarUrl}
            onChange={(url) => {
              setAvatarUrl(url);
              updateLinkInBio({ avatarUrl: url })
                .then(() => {
                  onSuccess();
                })
                .catch((err) => {
                  toast.error(err instanceof Error ? err.message : "Failed to save avatar");
                });
            }}
            size="lg"
          />
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            Click to upload. Max 4MB.
          </p>
        </div>
        <div className="flex-1 space-y-4 min-w-0">
          <div>
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A short bio for your link page"
              rows={3}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="slug">Custom link name</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              placeholder="dhafee"
              className="mt-1 font-mono"
            />
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {typeof window !== "undefined" ? window.location.origin : ""}/l/{slug || "your-name"}
            </p>
          </div>
        </div>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}

function AppearanceForm({
  data,
  onSuccess,
}: {
  data: NonNullable<LinkInBioWithLinks>;
  onSuccess: () => void;
}) {
  const [backgroundColor, setBackgroundColor] = useState(
    data.backgroundColor ?? "#0a0a0a"
  );
  const [buttonColor, setButtonColor] = useState(data.buttonColor ?? "#ffffff");
  const [buttonTextColor, setButtonTextColor] = useState(
    data.buttonTextColor ?? "#0a0a0a"
  );
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setBackgroundColor(data.backgroundColor ?? "#0a0a0a");
    setButtonColor(data.buttonColor ?? "#ffffff");
    setButtonTextColor(data.buttonTextColor ?? "#0a0a0a");
  }, [data.backgroundColor, data.buttonColor, data.buttonTextColor]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      await updateLinkInBio({
        backgroundColor,
        buttonColor,
        buttonTextColor,
      });
      onSuccess();
      toast.success("Appearance updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="bg">Background</Label>
          <div className="mt-1 flex gap-2">
            <input
              id="bg"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border border-border"
            />
            <Input
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="flex-1 font-mono text-sm"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="btn">Button color</Label>
          <div className="mt-1 flex gap-2">
            <input
              id="btn"
              type="color"
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border border-border"
            />
            <Input
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
              className="flex-1 font-mono text-sm"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="btnText">Button text</Label>
          <div className="mt-1 flex gap-2">
            <input
              id="btnText"
              type="color"
              value={buttonTextColor}
              onChange={(e) => setButtonTextColor(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border border-border"
            />
            <Input
              value={buttonTextColor}
              onChange={(e) => setButtonTextColor(e.target.value)}
              className="flex-1 font-mono text-sm"
            />
          </div>
        </div>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save appearance"}
      </Button>
    </form>
  );
}
