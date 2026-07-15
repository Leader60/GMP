import TrackCard from "@/components/TrackCard";
import { searchByGenre } from "@/lib/spotify";
import { GENRES } from "@/lib/constants";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export function generateStaticParams() {
  return GENRES.map((g) => ({ genre: g.slug }));
}

export default async function GenrePage({
  params,
}: {
  params: { genre: string };
}) {
  const genreInfo = GENRES.find((g) => g.slug === params.genre);
  if (!genreInfo) notFound();

  const tracks = await searchByGenre(genreInfo.slug, 30).catch(() => []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <p className="text-gold font-mono text-sm mb-2">نوع موسيقي</p>
      <h1 className="font-display text-3xl text-paper mb-8">{genreInfo.label}</h1>

      {tracks.length === 0 ? (
        <p className="text-muted">لا توجد نتائج كافية لهذا النوع حاليًا.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
          {tracks.map((t) => (
            <TrackCard key={t.id} track={t} fluid />
          ))}
        </div>
      )}
    </div>
  );
}
