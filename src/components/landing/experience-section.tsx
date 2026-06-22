"use client";

import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { experience, type ExperienceItem } from "@/config/experience";
import { cn } from "@/lib/utils";

function ExperienceCard({ job, delay }: { job: ExperienceItem; delay: number }) {
  const hasDetails = Boolean(job.details?.length);

  return (
    <div
      className="animate-in-up-on-view rounded-2xl border border-border bg-card/60 p-5"
      style={{ animationDelay: `${delay}s` }}
    >
      <Collapsible>
        <div className="group/card flex flex-row flex-nowrap items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold sm:text-2xl">{job.company}</h3>
              {job.working && (
                <div className="flex items-center gap-1 rounded-md border border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                  <div className="size-2 animate-pulse rounded-full bg-green-500" />
                  <span>Working</span>
                </div>
              )}
              {hasDetails && (
                <CollapsibleTrigger
                  className={cn(
                    "group/trigger inline-flex size-7 shrink-0 items-center justify-center rounded-md text-secondary transition-all hover:bg-muted hover:text-foreground",
                    "opacity-0 group-hover/card:opacity-100 data-[state=open]:opacity-100",
                  )}
                  aria-label="Expand details"
                >
                  <CaretRight className="size-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-90" />
                </CollapsibleTrigger>
              )}
            </div>
            <p className="mt-1 text-base text-secondary">{job.role}</p>
          </div>
          <div className="flex min-w-[96px] shrink-0 flex-col text-right text-sm text-secondary md:min-w-[150px]">
            <p className="md:hidden">{job.periodShort}</p>
            <p className="hidden md:block">{job.periodLong}</p>
            <p className="md:hidden">{job.locationShort}</p>
            <p className="hidden md:block">{job.locationLong}</p>
          </div>
        </div>
        <CollapsibleContent className="mt-4 space-y-2 text-sm text-secondary">
          {job.details?.map((detail) => (
            <p key={detail}>• {detail}</p>
          ))}
          {job.tech && (
            <div className="flex flex-wrap gap-2 pt-1">
              {job.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-muted px-2.5 py-1 font-mono text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export function ExperienceSection({
  limit,
  showAllLink = false,
}: {
  limit?: number;
  showAllLink?: boolean;
}) {
  const items = limit ? experience.slice(0, limit) : experience;

  return (
    <Container>
      <SectionHeading title="Experience" uppercase />
      <div className="flex flex-col gap-5">
        {items.map((job, index) => (
          <ExperienceCard key={job.company} job={job} delay={(index + 1) * 0.05} />
        ))}
      </div>
      {showAllLink && experience.length > (limit ?? experience.length) && (
        <Link
          href="/work"
          className="mt-5 inline-flex text-sm text-secondary transition-colors hover:text-foreground"
        >
          Show all work experiences
        </Link>
      )}
    </Container>
  );
}
