"use client";

import { useEffect, useState } from "react";
import { heroConfig } from "@/config/hero";
import { cn } from "@/lib/utils";

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
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

    const interval = setInterval(() => setNow(new Date()), 1_000);
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
        "min-w-0 text-right text-xs text-secondary",
        className,
      )}
    >
      {sameTime ? (
        <p className="min-w-0 leading-tight">
          <span className="font-semibold text-foreground">{myTime}</span>
          <span className="mx-1">·</span>
          same time
        </p>
      ) : (
        <div className="space-y-1 leading-tight">
          <p>
            <span className="uppercase tracking-wide">Your</span>{" "}
            <span className="font-semibold text-foreground">{yourTime}</span>
          </p>
          <p>
            <span className="uppercase tracking-wide">My</span>{" "}
            <span className="font-semibold text-foreground">{myTime}</span>
          </p>
        </div>
      )}
    </div>
  );
}
