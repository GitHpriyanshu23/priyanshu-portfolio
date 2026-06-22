import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  className,
  uppercase = false,
}: {
  title: string;
  className?: string;
  uppercase?: boolean;
}) {
  return (
    <div className={cn("mb-4", className)}>
      <h2
        className={cn(
          "font-bold tracking-tight text-foreground",
          uppercase
            ? "text-xs uppercase tracking-[0.2em] text-secondary"
            : "text-xl",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
