import { Container } from "@/components/container";
import { MediaCoverGrid } from "@/components/media-cover-grid";
import { favouriteMovies, favouriteSeries } from "@/config/favourites";

export const metadata = {
  title: "Favourites — Priyanshu Urmaliya",
  description:
    "Stories I've enjoyed and connected with across movies and series.",
};

export default function FavouritesPage() {
  return (
    <div className="pb-16 pt-8">
      <Container className="max-w-5xl space-y-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Favourites</h1>
          <p className="mt-3 max-w-xl text-secondary">
            Stories I&apos;ve enjoyed and connected with, across movies and series. Some
            inspired me, some made me think, and some I just genuinely loved watching.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Movies
          </h2>
          <MediaCoverGrid items={favouriteMovies} />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Series
          </h2>
          <MediaCoverGrid items={favouriteSeries} />
        </div>
      </Container>
    </div>
  );
}
