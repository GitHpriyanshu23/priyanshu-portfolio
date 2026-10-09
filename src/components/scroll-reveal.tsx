"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Enhance server-rendered content without hiding it when JavaScript is unavailable. */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seen = new WeakSet<Element>();
    const pending = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("scroll-reveal-pending");
        entry.target.classList.add("scroll-reveal-visible");
        pending.delete(entry.target);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });

    const register = () => {
      document.querySelectorAll("main [data-scroll-section], main .animate-in-up-on-view, main article.prose > *").forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        // Above-the-fold content stays visible and loads immediately.
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.classList.add("scroll-reveal-pending");
        pending.add(element);
        observer.observe(element);
      });
    };
    register();
    const mutations = new MutationObserver(register);
    const main = document.querySelector("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      pending.forEach((element) => element.classList.remove("scroll-reveal-pending"));
    };
  }, [pathname]);

  return null;
}
