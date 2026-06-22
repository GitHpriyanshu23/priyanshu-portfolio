import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/meta";
import {
  getGitHubContributions,
  groupContributionsByWeek,
  type ContributionDay,
} from "@/lib/github";
import { cn } from "@/lib/utils";

const CELL = 13;
const GAP = 4;
const WEEK_STEP = CELL + GAP;

const levelColors = [
  "bg-foreground/[0.06] dark:bg-foreground/[0.08]",
  "bg-foreground/[0.16] dark:bg-foreground/[0.18]",
  "bg-foreground/[0.28] dark:bg-foreground/[0.32]",
  "bg-foreground/[0.44] dark:bg-foreground/[0.48]",
  "bg-foreground/[0.62] dark:bg-foreground/[0.66]",
];

function getMonthLabels(weeks: ContributionDay[][]) {
  const labels: { month: string; weekIndex: number }[] = [];
  let lastMonth = "";

  weeks.forEach((week, weekIndex) => {
    const firstDay = week.find((day) => day.date);
    if (!firstDay) return;

    const month = new Date(firstDay.date).toLocaleString("en", { month: "short" }).toUpperCase();
    if (month === lastMonth) return;

    const lastIndex = labels[labels.length - 1]?.weekIndex ?? -4;
    if (weekIndex - lastIndex < 3) return;

    labels.push({ month, weekIndex });
    lastMonth = month;
  });

  return labels;
}

function getYearRange(contributions: { date: string }[]) {
  const dates = contributions.filter((d) => d.date).map((d) => new Date(d.date));
  if (!dates.length) return "";

  const start = dates[0]!.getFullYear();
  const end = dates[dates.length - 1]!.getFullYear();
  const endShort = String(end).slice(2);

  return start === end ? `${start}` : `${start}–${endShort}`;
}

export async function GitHubContributions() {
  const data = await getGitHubContributions(siteConfig.githubUsername);

  if (!data) return null;

  const weeks = groupContributionsByWeek(data.contributions);
  const monthLabels = getMonthLabels(weeks);
  const total = data.total.lastYear;
  const yearRange = getYearRange(data.contributions);
  const gridWidth = weeks.length * WEEK_STEP;

  return (
    <Container>
      <SectionHeading title="GitHub Activity" uppercase />
      <div className="animate-in-up-on-view">
        <div className="overflow-x-auto pb-1">
          <div style={{ minWidth: `${gridWidth}px` }}>
            <div className="relative mb-3 h-4 text-[11px] font-medium tracking-wider text-secondary">
              {monthLabels.map(({ month, weekIndex }) => (
                <span
                  key={`${month}-${weekIndex}`}
                  className="absolute whitespace-nowrap"
                  style={{ left: `${weekIndex * WEEK_STEP}px` }}
                >
                  {month}
                </span>
              ))}
            </div>

            <div className="flex" style={{ gap: `${GAP}px` }}>
              {weeks.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex flex-col"
                  style={{ gap: `${GAP}px` }}
                >
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      title={
                        day.date
                          ? `${day.count} contributions on ${day.date}`
                          : undefined
                      }
                      className={cn(
                        "rounded-[3px]",
                        day.level < 0
                          ? "bg-transparent"
                          : levelColors[day.level] ?? levelColors[0],
                      )}
                      style={{ width: CELL, height: CELL }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-[11px] font-medium tracking-wider text-secondary">
          <p className="uppercase">
            <span className="text-foreground">{total}</span> contributions · {yearRange}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="uppercase">Less</span>
            {levelColors.map((color, i) => (
              <div
                key={i}
                className={cn("rounded-[3px]", color)}
                style={{ width: CELL, height: CELL }}
              />
            ))}
            <span className="uppercase">More</span>
          </div>
        </div>

        <Link
          href={`https://github.com/${siteConfig.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[11px] text-secondary transition-colors hover:text-foreground"
        >
          @{siteConfig.githubUsername}
        </Link>
      </div>
    </Container>
  );
}
