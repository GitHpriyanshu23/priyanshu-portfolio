"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/container";
import { quoteConfig } from "@/config/quote";
import { getOrdinalSuffix } from "@/lib/ordinal";

export function QuoteVisitorCard() {
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const key = "visitor-counted";
    const alreadyCounted = sessionStorage.getItem(key);

    const load = async () => {
      try {
        if (!alreadyCounted) {
          const res = await fetch("/api/visitors", { method: "POST" });
          if (!res.ok) throw new Error("count failed");
          const data = (await res.json()) as { count: number };
          sessionStorage.setItem(key, "true");
          setCount(data.count);
          return;
        }

        const res = await fetch("/api/visitors");
        if (!res.ok) throw new Error("count failed");
        const data = (await res.json()) as { count: number };
        setCount(data.count);
      } catch {
        setFailed(true);
      }
    };

    void load();
  }, []);

  return (
    <Container>
      <div className="animate-in-up-on-view overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm backdrop-blur-sm">
        <div className="grid sm:grid-cols-[1fr_auto]">
          <div className="border-b border-border p-5 sm:border-b-0 sm:border-r">
            <span className="text-5xl leading-none text-muted-foreground sm:text-6xl">&ldquo;</span>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90 sm:text-base">
              {quoteConfig.text}
            </p>
            <p className="mt-3 text-right text-sm text-muted-foreground">
              — {quoteConfig.author}
            </p>
          </div>

          <div className="flex min-w-[200px] items-center justify-center p-5 text-center">
            {count !== null ? (
              <p className="text-sm text-muted-foreground sm:text-base">
                You are the{" "}
                <strong className="font-semibold text-foreground">
                  {count.toLocaleString()}
                </strong>
                <sup className="ml-0.5 text-xs">{getOrdinalSuffix(count)}</sup> visitor
              </p>
            ) : failed ? (
              <p className="text-sm text-muted-foreground">Thanks for visiting.</p>
            ) : (
              <p className="text-sm text-muted-foreground">Counting visitors...</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
