import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { MdxContent } from "@/components/mdx-content";
import { getProjectPost, getProjectPosts } from "@/lib/mdx";

export async function generateStaticParams() {
  const posts = await getProjectPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getProjectPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Projects` };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getProjectPost(slug);
  if (!post) notFound();

  return (
    <div className="space-y-8 pb-16 pt-8">
      <Container>
        <Link href="/projects" className="text-sm text-secondary hover:text-primary">
          ← Back to projects
        </Link>
        <p className="mt-4 font-mono text-xs text-muted-foreground">{post.date}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-secondary">{post.description}</p>
        {post.tech && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-muted px-2.5 py-1 font-mono text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <article className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          <MdxContent source={post.content} />
        </article>
      </Container>
    </div>
  );
}
