import { Hero } from "@/components/landing/hero";
import { Suspense } from "react";
import { LazyTechStack } from "@/components/landing/lazy-tech-stack";
import { FeaturedExperienceSection } from "@/components/landing/featured-experience-section";
import { FeaturedProjects } from "@/components/landing/featured-projects";
import { GitHubContributions } from "@/components/landing/github-contributions";
import { QuoteVisitorCard } from "@/components/landing/quote-visitor-card";
import { siteConfig } from "@/config/meta";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <div className="space-y-12 pb-24 pt-0 sm:space-y-16 sm:pb-20 sm:pt-8">
      <Hero />
      <LazyTechStack />
      <FeaturedExperienceSection />
      <FeaturedProjects />
      <Suspense fallback={<div className="mx-auto h-52 max-w-3xl rounded-xl bg-muted/40" aria-label="Loading GitHub activity" />}>
        <GitHubContributions />
      </Suspense>
      <QuoteVisitorCard />
    </div>
  );
}
