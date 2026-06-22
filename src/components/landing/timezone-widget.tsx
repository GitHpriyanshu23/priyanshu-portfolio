"use client";

import { useEffect, useState } from "react";
import { heroConfig } from "@/config/hero";
import { cn } from "@/lib/utils";

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(new Date());
}

function getOffsetMinutes(timeZone: string, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);

  const offset = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const match = offset.match(/GMT([+-])(\d+)(?::(\d+))?/);
  if (!match) return 0;

  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? 0);
  return sign * (hours * 60 + minutes);
}

export function TimezoneWidget({ className }: { className?: string }) {
  const [visitorTz, setVisitorTz] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setVisitorTz(Intl.DateTimeFormat().resolvedOptions().timeZone);

    const interval = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  if (!visitorTz) return null;

  const myTz = heroConfig.timezone;
  const sameTime =
    visitorTz === myTz ||
    getOffsetMinutes(visitorTz, now) === getOffsetMinutes(myTz, now);

  const myTime = formatTime(myTz);
  const yourTime = formatTime(visitorTz);

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col justify-center rounded-xl border border-border bg-card/80 px-3 py-2.5 shadow-sm backdrop-blur-sm",
        className,
      )}
    >
      {sameTime ? (
        <p className="whitespace-nowrap text-[11px] leading-tight text-secondary">
          <span className="font-semibold text-foreground">{myTime}</span>
          <span className="mx-1">·</span>
          same time
        </p>
      ) : (
        <div className="space-y-1 text-[10px] leading-tight">
          <p className="whitespace-nowrap text-secondary">
            <span className="uppercase tracking-wide">Your</span>{" "}
            <span className="font-semibold text-foreground">{yourTime}</span>
          </p>
          <p className="whitespace-nowrap text-secondary">
            <span className="uppercase tracking-wide">My</span>{" "}
            <span className="font-semibold text-foreground">{myTime}</span>
          </p>
        </div>
      )}
    </div>
  );
}
