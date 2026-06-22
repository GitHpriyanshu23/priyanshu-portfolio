"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { playThemeClickSound } from "@/lib/theme-click-sound";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    playThemeClickSound();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return <span className={cn("inline-flex size-8 items-center justify-center", className)} />;
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-primary active:scale-95",
        className,
      )}
    >
      {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
