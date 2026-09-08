import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-(--portfolio-content-width) px-5 sm:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
