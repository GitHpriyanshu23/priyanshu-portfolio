import Image from "next/image";
import Link from "next/link";
import { GithubLogo, Globe } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { projects, type Project } from "@/config/projects";
import { getTechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article
      className="animate-in-up-on-view group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div
        className={cn(
          "relative mx-4 mt-4 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-muted sm:aspect-[2/1]",
          !project.cover && ["bg-linear-to-br", project.gradient],
        )}
      >
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
            <span className="relative text-3xl font-bold tracking-tight text-foreground/20 sm:text-4xl">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold tracking-tight">{project.title}</h3>
          <div className="flex shrink-0 items-center gap-1">
            {project.website && (
              <Link
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
                className="rounded-md p-1 text-secondary transition-colors hover:text-foreground"
              >
                <Globe className="size-4" />
              </Link>
            )}
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="rounded-md p-1 text-secondary transition-colors hover:text-foreground"
            >
              <GithubLogo className="size-4" />
            </Link>
          </div>
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => {
            const icon = getTechIcon(tech);
            return icon ? (
              <div
                key={tech}
                title={tech}
                className="flex size-7 items-center justify-center rounded-md border border-border/60 bg-background/50 dark:bg-white/95"
              >
                <Image
                  src={`https://cdn.simpleicons.org/${icon}`}
                  alt={tech}
                  width={14}
                  height={14}
                  className="size-3.5"
                  unoptimized
                />
              </div>
            ) : (
              <span
                key={tech}
                className="rounded-md border border-dashed border-border px-2 py-0.5 font-mono text-[10px] text-secondary"
              >
                {tech}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export function ProjectsGrid({
  items,
  limit,
  showHeading = true,
  showViewAll = false,
}: {
  items?: Project[];
  limit?: number;
  showHeading?: boolean;
  showViewAll?: boolean;
}) {
  const source = items ?? projects;
  const list = limit && !items ? source.filter((p) => p.featured) : source;
  const displayed = limit ? list.slice(0, limit) : list;

  return (
    <Container>
      {showHeading && (
        <div className="mb-4 flex items-end justify-between gap-4">
          <SectionHeading title="Featured Projects" uppercase className="mb-0" />
          {showViewAll && (
            <Link
              href="/projects"
              className="shrink-0 text-xs uppercase tracking-wider text-secondary transition-colors hover:text-foreground"
            >
              View all
            </Link>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {displayed.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Container>
  );
}
