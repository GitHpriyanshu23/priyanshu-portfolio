import { cn } from "@/lib/utils";

export function AchievementGallery({
  images,
  title,
  className,
}: {
  images: string[];
  title: string;
  className?: string;
}) {
  if (images.length === 0) return null;

  return (
    <div className={cn("achievement-gallery", className)}>
      {images.map((src, index) => (
        <div key={`${src}-${index}`} className="achievement-gallery-item">
          {/* Native img keeps natural aspect ratios for masonry layout */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${title} — photo ${index + 1}`}
            loading={index < 4 ? "eager" : "lazy"}
            className="w-full rounded-xl border border-border bg-muted object-cover"
          />
        </div>
      ))}
    </div>
  );
}
