import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCover } from "@/components/blog-cover";
import { Container } from "@/components/container";
import { MdxContent } from "@/components/mdx-content";
import { heroConfig } from "@/config/hero";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Blog` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="pb-16 pt-8">
      <Container className="max-w-2xl">
        <Link
          href="/blog"
          className="text-sm text-secondary transition-colors hover:text-foreground"
        >
          ← Back to blog
        </Link>

        <BlogCover
          title={post.title}
          cover={post.cover}
          className="mt-6 aspect-[2/1] w-full rounded-2xl"
          priority
        />

        <header className="mt-8">
          <p className="text-xs uppercase tracking-wider text-secondary">{post.date}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-2 text-sm text-secondary">{heroConfig.name}</p>
          <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
            {post.description}
          </p>
        </header>

        <article className="prose prose-neutral dark:prose-invert mt-10 max-w-none border-t border-border pt-10">
          <MdxContent source={post.content} />
        </article>
      </Container>
    </div>
  );
}
