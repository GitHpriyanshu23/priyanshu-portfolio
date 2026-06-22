import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { getBlogPosts } from "@/lib/mdx";

export async function BlogPreview({ limit = 3 }: { limit?: number }) {
  const posts = (await getBlogPosts()).slice(0, limit);

  if (posts.length === 0) return null;

  return (
    <Container className="py-2">
      <SectionHeading title="Blog" uppercase />
      <div className="flex flex-col gap-3">
        {posts.map((post, index) => (
          <div
            key={post.slug}
            className="animate-in-up-on-view"
            style={{ animationDelay: `${(index + 1) * 0.05}s` }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-row items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 no-underline transition-colors hover:bg-muted/40"
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold leading-tight">{post.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-secondary sm:text-sm">
                  {post.description}
                </p>
                <p className="mt-1 text-xs text-secondary">{post.date}</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-secondary opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>
        ))}
      </div>
      <Link
        href="/blog"
        className="mt-4 inline-flex text-sm text-secondary transition-colors hover:text-foreground"
      >
        View all posts
      </Link>
    </Container>
  );
}
