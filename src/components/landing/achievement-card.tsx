"use client";

import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";
import { AchievementPhoto } from "@/components/achievement-photo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Achievement } from "@/config/achievements";
import { cn } from "@/lib/utils";

export function AchievementCard({
  achievement,
  showPhoto = false,
  linkToDetail = false,
  delay = 0,
}: {
  achievement: Achievement;
  showPhoto?: boolean;
  linkToDetail?: boolean;
  delay?: number;
}) {
  const hasDetails = Boolean(achievement.details?.length);
  const detailHref = `/achievements/${achievement.slug}`;

  const photo = showPhoto ? (
    linkToDetail ? (
      <Link href={detailHref} className="block">
        <AchievementPhoto
          achievement={achievement}
          className="aspect-[16/10] w-full transition-opacity hover:opacity-95"
        />
      </Link>
    ) : (
      <AchievementPhoto achievement={achievement} className="aspect-[16/10] w-full" />
    )
  ) : null;

  return (
    <article
      className="animate-in-up-on-view overflow-hidden rounded-xl border border-border bg-card/60"
      style={{ animationDelay: `${delay}s` }}
    >
      {photo}

      <Collapsible>
        <div className="group/card flex flex-row flex-nowrap items-start justify-between gap-3 p-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {linkToDetail ? (
                <Link
                  href={detailHref}
                  className="text-lg font-bold transition-colors hover:text-secondary"
                >
                  {achievement.organization}
                </Link>
              ) : (
                <h3 className="text-lg font-bold">{achievement.organization}</h3>
              )}
              <span className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-secondary">
                {achievement.title}
              </span>
              {hasDetails && (
                <CollapsibleTrigger
                  className={cn(
                    "group/trigger inline-flex size-6 shrink-0 items-center justify-center rounded-md text-secondary transition-all hover:bg-muted hover:text-foreground",
                    "opacity-0 group-hover/card:opacity-100 data-[state=open]:opacity-100",
                  )}
                  aria-label="Expand details"
                >
                  <CaretRight className="size-3.5 transition-transform duration-200 group-data-[state=open]/trigger:rotate-90" />
                </CollapsibleTrigger>
              )}
            </div>
          </div>
          <div className="flex min-w-[64px] shrink-0 flex-col text-right text-xs text-secondary md:min-w-[100px]">
            <p className="font-medium text-foreground">{achievement.year}</p>
            <p className="md:hidden">{achievement.periodShort}</p>
            <p className="hidden md:block">{achievement.periodLong}</p>
          </div>
        </div>

        <CollapsibleContent className="space-y-1.5 px-4 pb-4 text-sm text-secondary">
          {achievement.details?.map((detail) => (
            <p key={detail}>• {detail}</p>
          ))}
          {linkToDetail && (
            <Link
              href={detailHref}
              className="mt-2 inline-flex items-center gap-1 text-foreground transition-colors hover:text-secondary"
            >
              View photos
              <CaretRight className="size-3.5" />
            </Link>
          )}
        </CollapsibleContent>
      </Collapsible>
    </article>
  );
}
