# Priyanshu Urmaliya — Portfolio

Personal portfolio for an AI engineer and full-stack developer. Built with Next.js 15, TypeScript, Tailwind CSS v4, and MDX — clean layout, fast pages, and content you can edit without touching UI code.

![Portfolio preview](./public/assets/readme-preview.png)

**Live:** [priyanshuurmaliya.dev](https://priyanshuurmaliya.dev) · **GitHub:** [@GitHpriyanshu23](https://github.com/GitHpriyanshu23)

---

## Highlights

- **Home** — hero, tech stack, experience, achievements, featured projects, GitHub contributions, quote & visitor card
- **About** — narrative story page with highlighted text and connect links
- **Projects** — card grid with cover images, GitHub + live demo links, tech stack icons
- **Achievements** — SIH 2024 & 2025 with photo galleries
- **Blog** — MDX posts with custom covers
- **Books & Favourites** — curated lists with hover cards
- **Resume** — embedded PDF viewer with download link
- **Command palette** — search any page with `⌘K` / `Ctrl+K`
- **Theme toggle** — light / dark mode
- **Mowgli** — animated cursor pet in the navbar

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Content | MDX (`gray-matter`, `next-mdx-remote`) |
| Icons | [Phosphor Icons](https://phosphoricons.com/) |
| UI | Radix UI, cmdk |
| Theme | next-themes |

---

## Getting Started

**Requirements:** Node.js 18+

```bash
git clone https://github.com/GitHpriyanshu23/My_portfolio.git
cd My_portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
My_portfolio/
├── src/
│   ├── app/              # Routes (each folder = a URL)
│   ├── components/       # Reusable UI + landing sections
│   ├── config/           # Content & site data ← edit these most
│   └── lib/              # MDX, GitHub API, tech icons, utils
├── content/
│   ├── blog/             # MDX blog posts
│   └── projects/         # Optional long-form project writeups
├── public/
│   └── assets/           # Images (covers, photos, avatar)
├── data/
│   └── visitors.json     # Visitor counter storage
└── public/oneko/         # Cursor pet assets
```

### Routes

| Page | Path |
|------|------|
| Home | `/` |
| About | `/about` |
| Projects | `/projects` |
| Work | `/work` |
| Blog | `/blog` |
| Resume | `/resume` |
| Achievements | `/achievements` |
| Books | `/books` |
| Favourites | `/favourites` |

---

## Customizing Content

Most updates happen in **`src/config/`** — no component changes needed.

| File | What to edit |
|------|--------------|
| `hero.ts` | Name, bio, email, social links, avatar paths |
| `projects.ts` | Projects — title, description, `href` (GitHub), `website` (live demo), cover, tech |
| `achievements.ts` | Hackathon wins, cover image, photo gallery |
| `experience.ts` | Work history & internships |
| `about.ts` | About page story, traits, connect links |
| `navigation.ts` | Navbar & command menu links |
| `books.ts` / `favourites.ts` | Books, movies, series |
| `resume.ts` | Google Drive PDF links |
| `tech-stack.ts` | Home page tech icons |

**Blog posts:** add `.mdx` files to `content/blog/`  
**Project writeups:** add `.mdx` files to `content/projects/` (optional detail pages)

**Images:** place files in `public/assets/` and reference them as `/assets/your-image.png`

### Project links

```ts
{
  slug: "my-project",
  title: "My Project",
  href: "https://github.com/you/repo",       // GitHub (required)
  website: "https://my-app.vercel.app",      // Live demo (optional)
  cover: "/assets/projects/my-project.png",  // Card image (optional)
  tech: ["TypeScript", "Next.js"],
}
```

### Tech stack icons

Icons load from [Simple Icons CDN](https://simpleicons.org/). Add new tech names in `src/lib/tech-icons.ts`.

---

## Profile Images

| File | Purpose |
|------|---------|
| `public/assets/avatar.png` | Default avatar |
| `public/assets/avatar-smile.png` | Hover state |

---

## Visitor Counter

The home page shows a live visitor count via `POST /api/visitors`. Counts are stored in `data/visitors.json` locally.

> **Note:** On serverless hosts (e.g. Vercel), file-based storage won't persist across deployments. For production, use a database like Turso or Upstash Redis.

---

## Deploy

Works on [Vercel](https://vercel.com), Netlify, or any Node.js host.

```bash
npm run build
npm start
```

Set environment variables in `.env.local` if you add external API keys (Spotify, etc.).

---

## License

MIT — feel free to fork and make it yours. A star on GitHub is always appreciated.

---

Built with late nights, coffee, and curiosity.
