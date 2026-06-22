import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

type LinkItem = {
  title: string;
  description: string;
  href: string;
};

export function LinkCardSection({
  title,
  items,
}: {
  title: string;
  items: LinkItem[];
}) {
  return (
    <Container className="py-2">
      <SectionHeading title={title} />
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div
            key={item.href}
            className="animate-in-up-on-view"
            style={{ animationDelay: `${(index + 1) * 0.05}s` }}
          >
            <Link
              href={item.href}
              className="group flex flex-row items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2.5 no-underline transition-colors hover:bg-muted/60"
            >
              <div className="min-w-0 flex-1 space-y-0.5">
                <h3 className="text-base font-semibold leading-tight text-primary">
                  {item.title}
                </h3>
                <p className="line-clamp-2 text-xs text-secondary sm:text-sm">
                  {item.description}
                </p>
              </div>
              <span className="inline-flex shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}
