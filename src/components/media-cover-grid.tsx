import { MediaCoverCard } from "@/components/media-cover-card";
import { cn } from "@/lib/utils";

export function MediaCoverGrid({
  items,
  getSubtitle,
  className,
}: {
  items: { title: string; cover: string; author?: string }[];
  getSubtitle?: (item: { title: string; cover: string; author?: string }) => string | undefined;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6",
        className,
      )}
    >
      {items.map((item) => (
        <MediaCoverCard
          key={item.title}
          title={item.title}
          subtitle={getSubtitle?.(item) ?? item.author}
          cover={item.cover}
        />
      ))}
    </div>
  );
}
