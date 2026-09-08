"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDown, House, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { headerNav, moreNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 text-sm text-secondary transition-colors hover:text-foreground"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        More
        <CaretDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[10rem] rounded-xl border border-border bg-card p-1.5 shadow-lg">
          {moreNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-secondary transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  const openCommand = () => {
    document.dispatchEvent(new CustomEvent("open-command-menu"));
  };

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-(--portfolio-content-width) items-center justify-between gap-4 px-5 sm:px-0">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight text-foreground hover:opacity-80"
        >
          PU
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden items-center gap-4 text-sm font-medium sm:flex sm:gap-5">
            {headerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  pathname === item.href
                    ? "font-semibold text-foreground"
                    : "text-secondary",
                )}
              >
                {item.label}
              </Link>
            ))}
            <MoreMenu />
          </nav>

          <button
            type="button"
            onClick={openCommand}
            aria-label="Open command palette"
            className="hidden h-8 items-center gap-2 rounded-full border border-border bg-card/80 px-3 text-sm text-secondary shadow-sm transition-colors hover:border-foreground/20 hover:text-foreground sm:inline-flex"
          >
            <MagnifyingGlass className="size-4" weight="bold" />
            <span className="hidden items-center gap-1 sm:inline-flex">
              <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px]">
                ⌘
              </kbd>
              <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px]">
                K
              </kbd>
            </span>
          </button>

          <div className="hidden h-4 w-px bg-border sm:block" />

          <ThemeToggle />
        </div>
      </div>
    </header>
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:hidden">
      <LiquidGlassCard
        glowIntensity="sm"
        shadowIntensity="md"
        borderRadius="9999px"
        blurIntensity="md"
        className="p-1.5"
        contentClassName="flex flex-row items-center gap-2"
      >
        <Link
          href="/"
          aria-label="Home"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full text-secondary",
            pathname === "/" && "bg-foreground text-background",
          )}
        >
          <House className="size-5" />
        </Link>
        <button
          type="button"
          onClick={openCommand}
          aria-label="Search portfolio"
          className="inline-flex h-10 min-w-40 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 text-sm font-medium text-foreground shadow-inner backdrop-blur-md"
        >
          <MagnifyingGlass className="size-4" weight="bold" />
          Search
        </button>
      </LiquidGlassCard>
    </div>
    </>
  );
}
