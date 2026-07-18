import type { MetadataRoute } from "next";
import { achievements } from "@/config/achievements";
import { siteConfig } from "@/config/meta";
import { getBlogPosts, getProjectPosts } from "@/lib/mdx";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
  { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteConfig.url}/projects`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${siteConfig.url}/work`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${siteConfig.url}/resume`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${siteConfig.url}/achievements`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${siteConfig.url}/books`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${siteConfig.url}/favourites`, changeFrequency: "monthly", priority: 0.6 },
];

function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? undefined : new Date(parsed);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, projectPosts] = await Promise.all([
    getBlogPosts(),
    getProjectPosts(),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: parseDate(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const achievementRoutes: MetadataRoute.Sitemap = achievements.map((item) => ({
    url: `${siteConfig.url}/achievements/${item.slug}`,
    lastModified: new Date(`${item.year}-12-31`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projectPosts.map((post) => ({
    url: `${siteConfig.url}/projects/${post.slug}`,
    lastModified: parseDate(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...achievementRoutes, ...projectRoutes];
}
