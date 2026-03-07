"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CryptoCopyButton({ address }: { address: string }) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="shrink-0 border-white/20 bg-white/5 text-white hover:bg-white/10"
      onClick={() => {
        navigator.clipboard.writeText(address);
        toast.success("Address copied to clipboard");
      }}
    >
      <Copy className="mr-2 h-4 w-4" />
      Copy
    </Button>
  );
}
