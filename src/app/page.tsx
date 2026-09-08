import { Hero } from "@/components/landing/hero";
import { TechStackSection } from "@/components/landing/tech-stack-section";
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
      <TechStackSection />
      <FeaturedExperienceSection />
      <FeaturedProjects />
      <GitHubContributions />
      <QuoteVisitorCard />
    </div>
  );
}
