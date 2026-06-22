import Image from "next/image";
import { cn } from "@/lib/utils";

export function BlogCover({
  title,
  cover,
  className,
  priority = false,
}: {
  title: string;
  cover?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!cover) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-linear-to-br from-foreground/5 via-foreground/10 to-foreground/5",
          className,
        )}
      >
        <span className="text-5xl font-bold tracking-tight text-foreground/15">
          {title.slice(0, 1).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Image
        src={cover}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 720px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        priority={priority}
      />
    </div>
  );
}
