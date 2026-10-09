"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const TechStackSection = dynamic(() =>
  import("./tech-stack-section").then((module) => module.TechStackSection),
);

export function LazyTechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: 160 }}>
      {visible ? (
        <TechStackSection />
      ) : (
        <div className="mx-auto max-w-3xl px-4" aria-label="Loading tech stack">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="mt-5 h-[104px] rounded-xl bg-muted/40" />
        </div>
      )}
    </div>
  );
}
