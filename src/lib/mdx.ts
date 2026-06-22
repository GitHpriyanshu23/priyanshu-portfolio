import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type ContentItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  cover?: string;
  tech?: string[];
};

const contentRoot = path.join(process.cwd(), "content");

async function readMdxFiles(dir: string): Promise<ContentItem[]> {
  try {
    const fullDir = path.join(contentRoot, dir);
    const files = await fs.readdir(fullDir);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const items = await Promise.all(
      mdxFiles.map(async (file) => {
        const raw = await fs.readFile(path.join(fullDir, file), "utf8");
        const { data, content } = matter(raw);
        return {
          slug: file.replace(/\.mdx$/, ""),
          title: String(data.title ?? file),
          description: String(data.description ?? ""),
          date: String(data.date ?? ""),
          cover: data.cover ? String(data.cover) : undefined,
          tech: Array.isArray(data.tech) ? data.tech.map(String) : undefined,
          content,
        };
      }),
    );

    return items.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return [];
  }
}

export async function getBlogPosts() {
  return readMdxFiles("blog");
}

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getProjectPosts() {
  return readMdxFiles("projects");
}

export async function getProjectPost(slug: string) {
  const posts = await getProjectPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
