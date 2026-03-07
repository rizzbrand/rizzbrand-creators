"use client";

import Image from "next/image";
import { Container, Wrapper } from "@/components";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getMonetizationProfile,
  updateMonetizationProfile,
  addProduct,
  updateProduct,
  deleteProduct,
  reorderProducts,
  addCryptoWallet,
  updateCryptoWallet,
  deleteCryptoWallet,
} from "@/lib/actions/monetization";
import {
  type CryptoNetwork,
  CRYPTO_NETWORKS,
  CRYPTO_NETWORK_LABELS,
  CRYPTO_NETWORK_COINS,
} from "@/constants/crypto";
import {
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ProfileWithProducts = Awaited<ReturnType<typeof getMonetizationProfile>>;

const CURRENCIES = ["USD", "EUR", "GBP", "GHS", "NGN"];
const PRODUCT_TYPES = [
  { value: "one-time", label: "One-time" },
  { value: "subscription", label: "Subscription" },
  { value: "tip", label: "Tip" },
];

function CryptoWalletForm({ onSuccess }: { onSuccess: () => void }) {
  const [network, setNetwork] = useState<CryptoNetwork>("ethereum");
  const [address, setAddress] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    setPending(true);
    try {
      await addCryptoWallet({ network, address: address.trim() });
      setAddress("");
      onSuccess();
      toast.success("Wallet added");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add wallet");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1 min-w-0">
        <Label htmlFor="cryptoNetwork">Network</Label>
        <Select value={network} onValueChange={(v) => setNetwork(v as CryptoNetwork)}>
          <SelectTrigger id="cryptoNetwork" className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CRYPTO_NETWORKS.map((n) => (
              <SelectItem key={n} value={n}>
                {CRYPTO_NETWORK_LABELS[n]} ({CRYPTO_NETWORK_COINS[n].join(", ")})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-[2] min-w-0">
        <Label htmlFor="cryptoAddress">Wallet address</Label>
        <Input
          id="cryptoAddress"
          placeholder="0x... or T..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 font-mono text-sm"
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}

function CryptoWalletItem({
  wallet,
  onUpdate,
  onDelete,
}: {
  wallet: NonNullable<ProfileWithProducts>["cryptoWallets"][0];
  onUpdate: (id: string, data: { network: CryptoNetwork; address: string }) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [network, setNetwork] = useState(wallet.network as CryptoNetwork);
  const [address, setAddress] = useState(wallet.address);

  useEffect(() => {
    setNetwork(wallet.network as CryptoNetwork);
    setAddress(wallet.address);
  }, [wallet.network, wallet.address]);

  async function handleSave() {
    if (!address.trim()) return;
    await onUpdate(wallet.id, { network, address: address.trim() });
    setEditing(false);
    toast.success("Wallet updated");
  }

  const truncatedAddress =
    address.length > 20 ? `${address.slice(0, 10)}...${address.slice(-8)}` : address;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/20">
      <Wallet className="h-5 w-5 shrink-0 text-muted-foreground" />
      {editing ? (
        <div className="flex-1 space-y-2">
          <Select value={network} onValueChange={(v) => setNetwork(v as CryptoNetwork)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CRYPTO_NETWORKS.map((n) => (
                <SelectItem key={n} value={n}>
                  {CRYPTO_NETWORK_LABELS[n]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Wallet address"
            className="font-mono text-sm"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setNetwork(wallet.network as CryptoNetwork);
                setAddress(wallet.address);
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
            <p className="text-sm font-medium">{CRYPTO_NETWORK_LABELS[network]}</p>
            <p className="truncate font-mono text-xs text-muted-foreground" title={address}>
              {truncatedAddress}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {CRYPTO_NETWORK_COINS[network].join(", ")}
            </p>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={async () => {
              await onDelete(wallet.id);
              toast.success("Wallet removed");
            }}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}

function ProductForm({
  onSuccess,
  defaultCurrency,
}: {
  onSuccess: () => void;
  defaultCurrency: string;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState(defaultCurrency);
  const [type, setType] = useState<"one-time" | "subscription" | "tip">("one-time");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setCurrency(defaultCurrency);
  }, [defaultCurrency]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const priceNum = parseFloat(price);
    if (!name.trim() || isNaN(priceNum) || priceNum < 0 || !paymentUrl.trim())
      return;
    setPending(true);
    try {
      await addProduct({
        name: name.trim(),
        description: description.trim() || undefined,
        price: priceNum,
        currency,
        type,
        paymentUrl: paymentUrl.trim(),
      });
      setName("");
      setDescription("");
      setPrice("");
      setPaymentUrl("");
      onSuccess();
      toast.success("Product added");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add product");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-dashed border-border bg-muted/30 p-5">
      <h4 className="text-sm font-medium">Add product or offer</h4>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="e.g. Buy me a coffee"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="9.99"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="desc">Description (optional)</Label>
        <Textarea
          id="desc"
          placeholder="What does this include?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="mt-1"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={(v: "one-time" | "subscription" | "tip") => setType(v)}>
            <SelectTrigger id="type" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger id="currency" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="paymentUrl">Payment URL *</Label>
        <Input
          id="paymentUrl"
          placeholder="https://buy.stripe.com/... or Ko-fi, Gumroad, etc."
          value={paymentUrl}
          onChange={(e) => setPaymentUrl(e.target.value)}
          type="url"
          className="mt-1"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Link to Stripe, Ko-fi, Gumroad, or any payment page
        </p>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Adding..." : "Add product"}
      </Button>
    </form>
  );
}

function ProductItem({
  product,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: {
  product: NonNullable<ProfileWithProducts>["products"][0];
  onUpdate: (
    id: string,
    data: {
      name: string;
      description?: string;
      price: number;
      currency: string;
      type: "one-time" | "subscription" | "tip";
      paymentUrl: string;
    }
  ) => void;
  onDelete: (id: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description ?? "");
  const [price, setPrice] = useState(product.price.toString());
  const [currency, setCurrency] = useState(product.currency);
  const [type, setType] = useState<"one-time" | "subscription" | "tip">(
    (product.type as "one-time" | "subscription" | "tip") || "one-time"
  );
  const [paymentUrl, setPaymentUrl] = useState(product.paymentUrl);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description ?? "");
    setPrice(product.price.toString());
    setCurrency(product.currency);
    setType((product.type as "one-time" | "subscription" | "tip") || "one-time");
    setPaymentUrl(product.paymentUrl);
  }, [product]);

  async function handleSave() {
    const priceNum = parseFloat(price);
    if (!name.trim() || isNaN(priceNum) || priceNum < 0 || !paymentUrl.trim())
      return;
    await onUpdate(product.id, {
      name: name.trim(),
      description: description.trim() || undefined,
      price: priceNum,
      currency,
      type,
      paymentUrl: paymentUrl.trim(),
    });
    setEditing(false);
    toast.success("Product updated");
  }

  const formatPrice = (p: number, c: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: c,
    }).format(p);

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/20">
      <div className="flex flex-col gap-0.5 pt-1">
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
        <div className="flex-1 space-y-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={2}
          />
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={(v: "one-time" | "subscription" | "tip") => setType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            value={paymentUrl}
            onChange={(e) => setPaymentUrl(e.target.value)}
            placeholder="Payment URL"
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
                setName(product.name);
                setDescription(product.description ?? "");
                setPrice(product.price.toString());
                setCurrency(product.currency);
                setType((product.type as "one-time" | "subscription" | "tip") || "one-time");
                setPaymentUrl(product.paymentUrl);
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
            <p className="font-medium">{product.name}</p>
            {product.description && (
              <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                {product.description}
              </p>
            )}
            <p className="mt-1 text-sm font-semibold text-primary">
              {formatPrice(product.price, product.currency)}
              {product.type !== "one-time" && (
                <span className="ml-1 font-normal text-muted-foreground">
                  / {product.type}
                </span>
              )}
            </p>
          </div>
          <div className="flex shrink-0 gap-1">
            <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={async () => {
                await onDelete(product.id);
                toast.success("Product removed");
              }}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default function MonetizationPage() {
  const [data, setData] = useState<ProfileWithProducts | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getMonetizationProfile().then(setData).finally(() => setPending(false));
  }, []);

  async function refresh() {
    setData(await getMonetizationProfile());
  }

  async function handleMoveUp(index: number) {
    if (!data || index <= 0) return;
    const products = [...data.products];
    [products[index - 1], products[index]] = [products[index], products[index - 1]];
    await reorderProducts(products.map((p) => p.id));
    refresh();
  }

  async function handleMoveDown(index: number) {
    if (!data || index >= data.products.length - 1) return;
    const products = [...data.products];
    [products[index], products[index + 1]] = [products[index + 1], products[index]];
    await reorderProducts(products.map((p) => p.id));
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

  const publicUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/m/${data.slug}`;

  return (
    <Wrapper className="min-h-screen py-8 md:py-12">
      <Container className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold md:text-3xl">
              Monetization
            </h1>
            <p className="mt-1 text-muted-foreground">
              Sell products, accept tips, and get paid. Add your Stripe, Ko-fi, or
              Gumroad links.
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
              <a href={`/m/${data.slug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Preview
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="order-2 space-y-8 lg:order-1">
            {/* Profile */}
            <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
              <h2 className="mb-6 font-medium">Profile</h2>
              <ProfileForm data={data} onSuccess={refresh} />
            </section>

            {/* Crypto wallets */}
            <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
              <h2 className="mb-6 font-medium">Crypto wallets (stablecoins)</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Add your wallet addresses to receive USDT, USDC, DAI and other
                stablecoins.
              </p>
              <CryptoWalletForm onSuccess={refresh} />
              <div className="mt-6 space-y-3">
                {data.cryptoWallets.map((wallet) => (
                  <CryptoWalletItem
                    key={wallet.id}
                    wallet={wallet}
                    onUpdate={async (id, d) => {
                      await updateCryptoWallet(id, d);
                      refresh();
                    }}
                    onDelete={deleteCryptoWallet}
                  />
                ))}
              </div>
            </section>

            {/* Products */}
            <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
              <h2 className="mb-6 font-medium">Products & offers</h2>
              <ProductForm onSuccess={refresh} defaultCurrency={data.currency} />
              <div className="mt-6 space-y-3">
                {data.products.map((product, index) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onUpdate={async (id, d) => {
                      await updateProduct(id, d);
                      refresh();
                    }}
                    onDelete={deleteProduct}
                    onMoveUp={() => handleMoveUp(index)}
                    onMoveDown={() => handleMoveDown(index)}
                    canMoveUp={index > 0}
                    canMoveDown={index < data.products.length - 1}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Live preview */}
          <aside className="order-1 self-start lg:sticky lg:top-24 lg:order-2">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Preview</p>
            <div className="overflow-hidden rounded-2xl border border-border bg-neutral-950 shadow-xl">
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
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-xl">
                      💰
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
                {data.cryptoWallets.slice(0, 2).map((wallet) => (
                  <div
                    key={wallet.id}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-white/80"
                  >
                    {CRYPTO_NETWORK_LABELS[wallet.network as CryptoNetwork]}
                  </div>
                ))}
                {data.products.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <span className="truncate text-xs text-white">{product.name}</span>
                    <span className="ml-2 shrink-0 text-xs font-semibold text-emerald-400">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: product.currency,
                      }).format(product.price)}
                    </span>
                  </div>
                ))}
                {(data.products.length > 3 || data.cryptoWallets.length > 2) && (
                  <p className="text-center text-xs text-white/50">
                    +{Math.max(0, data.products.length - 3) + Math.max(0, data.cryptoWallets.length - 2)} more
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
  data: NonNullable<ProfileWithProducts>;
  onSuccess: () => void;
}) {
  const [displayName, setDisplayName] = useState(data.displayName ?? "");
  const [bio, setBio] = useState(data.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(data.avatarUrl ?? "");
  const [slug, setSlug] = useState(data.slug ?? "");
  const [currency, setCurrency] = useState(data.currency);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setDisplayName(data.displayName ?? "");
    setBio(data.bio ?? "");
    setAvatarUrl(data.avatarUrl ?? "");
    setSlug(data.slug ?? "");
    setCurrency(data.currency);
  }, [data.displayName, data.bio, data.avatarUrl, data.slug, data.currency]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      await updateMonetizationProfile({
        displayName,
        bio,
        avatarUrl: avatarUrl || undefined,
        slug: slug.trim() || undefined,
        currency,
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
              updateMonetizationProfile({ avatarUrl: url })
                .then(() => onSuccess())
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
              placeholder="Support my work"
              rows={2}
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
              {typeof window !== "undefined" ? window.location.origin : ""}/m/{slug || "your-name"}
            </p>
          </div>
          <div>
            <Label htmlFor="currency">Default currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}
