import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("container mx-auto max-w-3xl px-5 sm:px-6", className)}>
      {children}
    </div>
  );
}
