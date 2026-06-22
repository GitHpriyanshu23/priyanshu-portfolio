"use client";

import Image from "next/image";
import { heroConfig } from "@/config/hero";
import { cn } from "@/lib/utils";

export function ProfileAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "group relative size-24 shrink-0 cursor-pointer overflow-hidden rounded-full bg-blue-300 dark:bg-yellow-300",
        className,
      )}
    >
      <Image
        src={heroConfig.avatar}
        alt={`${heroConfig.name} profile`}
        width={96}
        height={96}
        className="size-full rounded-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        priority
      />
      <Image
        src={heroConfig.avatarSmile}
        alt={`${heroConfig.name} smiling`}
        width={96}
        height={96}
        className="absolute inset-0 size-full rounded-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        priority
      />
    </div>
  );
}
