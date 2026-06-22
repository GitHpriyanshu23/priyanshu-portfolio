"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function MediaCoverCard({
  title,
  subtitle,
  cover,
  className,
}: {
  title: string;
  subtitle?: string;
  cover: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "group relative aspect-[2/3] overflow-hidden rounded-[1.25rem] border border-border bg-muted shadow-sm",
        className,
      )}
    >
      {!failed ? (
        <Image
          src={cover}
          alt={title}
          fill
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 28vw, 220px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-muted p-4 text-center">
          <span className="text-xs font-medium text-secondary">{title}</span>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
        <p className="text-sm font-semibold leading-tight text-white">{title}</p>
        {subtitle && (
          <p className="mt-0.5 text-xs leading-snug text-white/75">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
