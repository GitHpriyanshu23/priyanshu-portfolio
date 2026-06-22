import { Container } from "@/components/container";
import { MediaCoverGrid } from "@/components/media-cover-grid";
import { books } from "@/config/books";

export const metadata = {
  title: "Books — Priyanshu Urmaliya",
  description:
    "A collection of books that made me pause, think, and see things differently.",
};

export default function BooksPage() {
  return (
    <div className="pb-16 pt-8">
      <Container className="max-w-5xl space-y-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Books</h1>
          <p className="mt-3 max-w-xl text-secondary">
            A collection of books I&apos;ve read and genuinely enjoyed. Some changed how I
            think, some taught me something new, and some just stayed in my head long after I
            finished them.
          </p>
        </div>

        <MediaCoverGrid items={books} getSubtitle={(book) => book.author} />
      </Container>
    </div>
  );
}
