"use client";

import { Code, Plus, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { experience, type ExperienceItem } from "@/config/experience";

function ExperienceCard({
  job,
  delay,
  open,
  onToggle,
}: {
  job: ExperienceItem;
  delay: number;
  open: boolean;
  onToggle: () => void;
}) {
  const hasDetails = Boolean(job.details?.length);

  return (
    <article
      className="animate-in-up-on-view border-b border-border py-7 first:border-t"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="grid gap-4 sm:grid-cols-[28px_48px_minmax(0,1fr)_auto] sm:items-start">
        <div className="hidden justify-center pt-1 sm:flex">
          <span className="size-2 rounded-full bg-secondary/25" />
        </div>
        <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-background/70 text-secondary shadow-sm">
          <Code className="size-5" />
        </div>
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tight">{job.company}</h3>
            {job.working && (
              <div className="flex items-center gap-1 rounded-md border border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                <div className="size-2 animate-pulse rounded-full bg-green-500" />
                <span>Working</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight">{job.role}</p>
            <p className="mt-1 text-base text-secondary">
              Internship
              <span className="mx-2 text-border">|</span>
              <span className="md:hidden">{job.periodShort}</span>
              <span className="hidden md:inline">{job.periodLong}</span>
            </p>
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 sm:justify-end">
          <p className="text-sm text-secondary sm:hidden">{job.locationShort}</p>
        {hasDetails && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={`experience-${job.company}`}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-secondary transition-colors hover:bg-muted hover:text-foreground"
          >
            {open ? <X className="size-4" /> : <Plus className="size-4" />}
          </button>
        )}
        </div>
      </div>
      {open && (
        <div
          id={`experience-${job.company}`}
          className="animate-in-up-on-view mt-5 space-y-5 sm:ml-[76px]"
        >
          <div className="space-y-2 text-base leading-relaxed text-foreground">
            {job.details?.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
          {job.tech && (
            <div className="flex flex-wrap gap-2">
              {job.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export function ExperienceSection({
  limit,
  showAllLink = false,
}: {
  limit?: number;
  showAllLink?: boolean;
}) {
  const [openJob, setOpenJob] = useState<string | null>(null);
  const items = limit ? experience.slice(0, limit) : experience;

  return (
    <Container>
      <SectionHeading title="Experience" uppercase />
      <div>
        {items.map((job, index) => (
          <ExperienceCard
            key={job.company}
            job={job}
            delay={(index + 1) * 0.05}
            open={openJob === job.company}
            onToggle={() =>
              setOpenJob((current) => (current === job.company ? null : job.company))
            }
          />
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
