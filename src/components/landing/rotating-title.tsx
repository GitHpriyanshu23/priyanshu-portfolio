"use client";

import { useEffect, useState } from "react";
import { rotatingTitles } from "@/config/quote";

export function RotatingTitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-6 overflow-hidden">
      {rotatingTitles.map((title, i) => (
        <p
          key={title}
          className="absolute inset-0 text-sm font-medium tracking-wide text-secondary transition-all duration-700 ease-in-out sm:text-base"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "translateY(0)" : "translateY(14px)",
            filter: i === index ? "blur(0)" : "blur(6px)",
          }}
        >
          {title}
        </p>
      ))}
    </div>
  );
}
