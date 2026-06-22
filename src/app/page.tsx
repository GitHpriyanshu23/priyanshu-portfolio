import { Hero } from "@/components/landing/hero";
import { TechStackSection } from "@/components/landing/tech-stack-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { AchievementsSection } from "@/components/landing/achievements-section";
import { FeaturedProjects } from "@/components/landing/featured-projects";
import { GitHubContributions } from "@/components/landing/github-contributions";
import { QuoteVisitorCard } from "@/components/landing/quote-visitor-card";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20 pt-14">
      <Hero />
      <TechStackSection />
      <ExperienceSection limit={3} showAllLink />
      <AchievementsSection limit={3} showAllLink />
      <FeaturedProjects limit={2} />
      <GitHubContributions />
      <QuoteVisitorCard />
    </div>
  );
}
