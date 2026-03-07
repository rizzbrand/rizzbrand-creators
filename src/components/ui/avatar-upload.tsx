"use client";

import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { Camera, Loader2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { cn } from "@/functions";

interface AvatarUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
};

export function AvatarUpload({
  value,
  onChange,
  disabled,
  className,
  size = "lg",
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      const file = res?.[0];
      const url = file?.url ?? (file as { ufsUrl?: string })?.ufsUrl;
      if (url) {
        onChange(url);
      }
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      toast.error(error?.message ?? "Upload failed");
    },
  });

  const handleClick = () => {
    if (disabled || isUploading) return;
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      startUpload([file]);
    }
    e.target.value = "";
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isUploading}
        className={cn(
          "group relative flex overflow-hidden rounded-full border-2 border-dashed border-border bg-muted transition-colors hover:border-primary/50 hover:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[size]
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {value ? (
          <Image
            src={value}
            alt="Avatar"
            fill
            className="object-cover"
            sizes="128px"
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Camera className="h-8 w-8" />
            <span className="mt-1 text-xs">Upload</span>
          </div>
        )}
        {(isUploading || (value && !disabled)) && (
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity ${
              isUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            ) : (
              <Camera className="h-8 w-8 text-white" />
            )}
          </div>
        )}
      </button>
    </div>
  );
}
