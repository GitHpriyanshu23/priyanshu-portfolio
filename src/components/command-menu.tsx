"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { commandItems } from "@/config/navigation";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onOpen = () => setOpen(true);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("open-command-menu", onOpen);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  const navigate = (href: string, external?: boolean) => {
    setOpen(false);
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(href);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global search"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <MagnifyingGlass className="size-4 shrink-0 text-muted-foreground" />
          <Command.Input
            placeholder="Search pages and links..."
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close search"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-4 py-8 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>
          <Command.Group heading="Navigate">
            {commandItems.map((item) => {
              const external = "external" in item ? Boolean(item.external) : false;
              return (
                <Command.Item
                  key={`${item.label}-${item.href}`}
                  value={item.label}
                  onSelect={() => navigate(item.href, external)}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm aria-selected:bg-muted"
                >
                  {item.label}
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
