import { heroConfig } from "@/config/hero";

export const aboutConfig = {
  headline: ["From curious experiments", "to building with AI."],
  intro:
    "I'm Priyanshu Urmaliya — an **AI engineer** and **full-stack developer** who enjoys turning messy ideas into working products. I care about the details: clean APIs, useful interfaces, and systems that actually **ship**.",
  quote:
    "I believe the best builders learn in public, ship early, and refine until the product feels obvious to use.",
  traits: ["Curious", "Builder", "Focused", "Persistent"] as const,
  traitStyles: {
    Curious:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/80 dark:bg-sky-950/40 dark:text-sky-300",
    Builder:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/80 dark:bg-emerald-950/40 dark:text-emerald-300",
    Focused:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300",
    Persistent:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800/80 dark:bg-violet-950/40 dark:text-violet-300",
  },
  meta: [
    { label: "Location", value: heroConfig.location },
    { label: "Status", value: "Open to opportunities" },
    { label: "Focus", value: "AI · RAG · Full-stack" },
  ],
  story: {
    title: "How it started",
    paragraphs: [
      "It started in school with a simple question: how does software actually work? I was fascinated by how a few lines of code could become something people use every day. That **curiosity** pushed me toward engineering — and eventually toward **AI**.",
      "College became a mix of coursework, **hackathons**, and late-night builds. I failed plenty along the way — exams, competitions, and projects that never made it past version one. But each attempt taught me something about **scope**, **teamwork**, and staying calm when things break.",
      "Hackathons changed the pace. **Smart India Hackathon** pushed me to ship under pressure with a team, communicate clearly, and demo something real — not just a slide deck. That experience shaped how I build today: fast iterations, tight feedback loops, and focus on what **users** actually need.",
      "Now I spend most of my time at the intersection of **AI and product** — RAG systems, LLM workflows, and full-stack apps that connect models to real interfaces. I'm still figuring things out, but I'm doing it by **building**.",
    ],
  },
  principles: {
    title: "How I work",
    items: [
      {
        title: "Stay curious",
        description:
          "AI moves fast. I learn by building, reading, and talking to people a few steps ahead of me.",
      },
      {
        title: "Ship, then refine",
        description:
          "A working prototype beats a perfect plan. I prefer real feedback over endless polishing.",
      },
      {
        title: "Sweat the details",
        description:
          "Loading states, edge cases, and clear UX matter as much as the model or API behind them.",
      },
      {
        title: "Build for humans",
        description:
          "Technology is a means to an end. If it doesn't solve a real problem, it doesn't count.",
      },
    ],
  },
  beyond: {
    title: "Beyond the code",
    paragraphs: [
      "Outside of work, you'll find me writing on Medium, exploring new tools, or chasing the next **hackathon** idea. I like **learning in public** and sharing what actually worked — and what didn't.",
      "I'm drawn to builders who combine **technical depth** with **clarity**. That's the kind of engineer I want to become.",
    ],
  },
  connectLinks: [
    {
      name: "Email",
      href: "mailto:priyanshuurmaliya23011@gmail.com",
      icon: "mail" as const,
    },
    {
      name: "X",
      href: "https://x.com/imdevPU23",
      icon: "x" as const,
    },
    {
      name: "GitHub",
      href: "https://github.com/GitHpriyanshu23",
      icon: "github" as const,
    },
  ],
};
