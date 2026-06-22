# Priyanshu Urmaliya — Portfolio

A personal portfolio inspired by [ramx.in](https://ramx.in/), built with Next.js 15, TypeScript, Tailwind CSS v4, and MDX.

## Features

- ramx.in-style layout with grid background and narrow `max-w-2xl` container
- Custom profile avatar with hover smile swap
- Home, Work, Blog, Resume, Projects, Gears, Setup, Terminal, Books, Movies
- MDX blog and project detail pages
- Command palette search (`⌘K` / `Ctrl+K`)
- Dark / light theme (light default)
- Built-in footer visitor counter API

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize Content

Edit files in `src/config/`:

- `hero.ts` — name, bio, email, social links
- `experience.ts` — work history
- `projects.ts` — project list
- `education.ts` — education and skills
- `sections.ts` — gears, books, movies, setup, terminal
- `navigation.ts` — nav and command menu items

Blog posts: `content/blog/*.mdx`  
Project details: `content/projects/*.mdx`

Profile images:

- `public/assets/avatar.png` (default)
- `public/assets/avatar-smile.png` (hover)

## Visitor Counter

Counts are stored in `data/visitors.json` locally. Each browser session increments once via `POST /api/visitors`.

For serverless deploys (e.g. Vercel), switch to a writable store like Turso or Upstash — the file store won't persist across invocations.

## Deploy

```bash
npm run build
npm start
```

## License

MIT
