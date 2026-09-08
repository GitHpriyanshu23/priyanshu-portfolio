"use client";

import Image from "next/image";
import Link from "next/link";
import { GithubLogo, GlobeSimple } from "@phosphor-icons/react";
import { Container } from "@/components/container";
import { achievements, type Achievement } from "@/config/achievements";
import { experience, type ExperienceItem } from "@/config/experience";

type FeaturedItem =
  | {
      type: "experience";
      title: string;
      subtitle: string;
      period: string;
      location: string;
      image: string;
      details: string[];
      tech: string[];
      href: string;
    }
  | {
      type: "achievement";
      title: string;
      subtitle: string;
      period: string;
      location: string;
      image: string;
      details: string[];
      tech: string[];
      href: string;
    };

const techIcons: Record<string, string> = {
  "Data Pipelines": "apacheairflow",
  "Feature Engineering": "scikitlearn",
  IoT: "arduino",
  "Machine Learning": "tensorflow",
  Nextjs: "nextdotjs",
  "Next.js": "nextdotjs",
  PostgreSQL: "postgresql",
  Python: "python",
  React: "react",
  TypeScript: "typescript",
};

const achievementTech: Record<string, string[]> = {
  "sih-2025": ["Python", "React", "TypeScript", "Machine Learning"],
  "sih-2024": ["Next.js", "React", "TypeScript", "PostgreSQL"],
};

function experienceToFeatured(item: ExperienceItem): FeaturedItem {
  return {
    type: "experience",
    title: item.company,
    subtitle: item.role,
    period: item.periodLong,
    location: item.locationLong.trim(),
    image: "/assets/Valency-Energy-Logo.jpeg",
    details: item.details ?? [],
    tech: item.tech ?? [],
    href: "/work",
  };
}

function achievementToFeatured(item: Achievement): FeaturedItem {
  return {
    type: "achievement",
    title: item.organization,
    subtitle: item.title,
    period: item.periodLong,
    location: "Achievement",
    image: item.image ?? "/assets/og-image.jpg",
    details: item.details ?? [],
    tech: achievementTech[item.slug] ?? [],
    href: `/achievements/${item.slug}`,
  };
}

function TechPill({ name }: { name: string }) {
  const icon = techIcons[name] ?? name.toLowerCase().replaceAll(" ", "");

  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm">
      <Image
        src={`https://cdn.simpleicons.org/${icon}`}
        alt=""
        width={16}
        height={16}
        className="size-4 shrink-0"
        unoptimized
      />
      {name}
    </span>
  );
}

function FeaturedExperienceItem({
  item,
  delay,
}: {
  item: FeaturedItem;
  delay: number;
}) {
  return (
    <article
      className="animate-in-up-on-view py-7"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="grid gap-4 sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:items-start">
        <Link
          href={item.href}
          className="relative size-16 overflow-hidden rounded-xl bg-muted shadow-sm transition-transform hover:scale-[1.02]"
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </Link>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href={item.href}
              className="text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-secondary"
            >
              {item.title}
            </Link>
          </div>
          <p className="mt-1 text-xl text-foreground">{item.subtitle}</p>
        </div>

        <div className="text-left text-base text-secondary sm:min-w-[190px] sm:text-right sm:text-lg">
          <p>{item.period}</p>
          <p className="mt-1">{item.location}</p>
        </div>
      </div>

      {item.tech.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Technologies
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {item.tech.map((tech) => (
              <TechPill key={`${item.title}-${tech}`} name={tech} />
            ))}
          </div>
        </div>
      )}

      {item.details.length > 0 && (
        <ul className="mt-6 space-y-2 text-lg leading-relaxed text-secondary">
          {item.details.map((detail) => (
            <li key={detail} className="flex gap-2">
              <span className="mt-[0.65em] size-1.5 shrink-0 bg-secondary/70" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function FeaturedExperienceSection() {
  const featuredItems = [
    ...experience.map(experienceToFeatured),
    ...achievements.filter((item) => item.featured).map(achievementToFeatured),
  ].slice(0, 2);

  return (
    <Container>
      <div className="mb-8">
        <p className="text-sm text-secondary">Featured</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
          Experience
        </h2>
      </div>

      <div className="space-y-6">
        {featuredItems.map((item, index) => {
          const itemId = `${item.type}-${item.title}`;

          return (
            <FeaturedExperienceItem
              key={itemId}
              item={item}
              delay={0.08 + index * 0.08}
            />
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/work"
          className="rounded-lg border border-border bg-card px-5 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
        >
          Show all work experiences
        </Link>
      </div>
    </Container>
  );
}
