import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { AchievementGallery } from "@/components/achievement-gallery";
import { AchievementPhoto } from "@/components/achievement-photo";
import { Container } from "@/components/container";
import { achievements, getAchievement } from "@/config/achievements";

export async function generateStaticParams() {
  return achievements.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const achievement = getAchievement(slug);
  if (!achievement) return {};
  return {
    title: `${achievement.organization} — Achievements`,
    description: `${achievement.title} at ${achievement.organization}.`,
  };
}

export default async function AchievementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const achievement = getAchievement(slug);
  if (!achievement) notFound();

  const hasGallery = Boolean(achievement.gallery?.length);

  return (
    <div className="space-y-10 pb-16 pt-8">
      <Container>
        <Link
          href="/achievements"
          className="inline-flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to achievements
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <AchievementPhoto
            achievement={achievement}
            className="aspect-[16/10] w-full sm:aspect-[2/1]"
            priority
          />
          <div className="space-y-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {achievement.organization}
              </h1>
              <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-secondary">
                {achievement.title}
              </span>
            </div>
            <p className="text-sm text-secondary">
              {achievement.periodLong} · {achievement.year}
            </p>
            {achievement.details && achievement.details.length > 0 && (
              <ul className="space-y-1.5 text-sm leading-relaxed text-secondary">
                {achievement.details.map((detail) => (
                  <li key={detail}>• {detail}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>

      {hasGallery ? (
        <Container>
          <h2 className="text-lg font-semibold tracking-tight">Photos</h2>
          <p className="mt-1 text-sm text-secondary">
            Moments from {achievement.organization}.
          </p>
          <AchievementGallery
            images={achievement.gallery!}
            title={achievement.organization}
            className="mt-6"
          />
        </Container>
      ) : (
        <Container>
          <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center">
            <p className="text-sm text-secondary">Photos coming soon.</p>
          </div>
        </Container>
      )}
    </div>
  );
}
