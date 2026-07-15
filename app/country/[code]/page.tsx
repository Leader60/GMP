import ChartRow from "@/components/ChartRow";
import Link from "next/link";
import { getPlaylistTracks } from "@/lib/spotify";
import { COUNTRIES, COUNTRY_CHART_PLAYLISTS, GLOBAL_CHART_PLAYLIST_ID } from "@/lib/constants";
import { notFound } from "next/navigation";

export const revalidate = 1800;

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ code: c.code }));
}

export default async function CountryPage({ params }: { params: { code: string } }) {
  const country = COUNTRIES.find((c) => c.code === params.code);
  if (!country) notFound();

  const playlistId = COUNTRY_CHART_PLAYLISTS[params.code] || GLOBAL_CHART_PLAYLIST_ID;
  const usingFallback = !COUNTRY_CHART_PLAYLISTS[params.code];
  const tracks = await getPlaylistTracks(playlistId, 50).catch(() => []);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl text-paper mb-2">الأكثر رواجًا — {country.name}</h1>
      {usingFallback && (
        <p className="text-xs text-muted mb-4">
          لا توجد قائمة رواج مخصصة لهذه الدولة بعد، معروضة القائمة العالمية مؤقتًا.
          يمكن إضافتها من lib/constants.ts.
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {COUNTRIES.map((c) => (
          <Link
            key={c.code}
            href={`/country/${c.code}`}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              c.code === params.code
                ? "border-gold text-gold"
                : "border-hairline text-muted hover:border-gold hover:text-gold"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {tracks.length === 0 ? (
        <p className="text-muted">تعذّر تحميل البيانات حاليًا.</p>
      ) : (
        <div>
          {tracks.map((t, i) => (
            <ChartRow key={t.id} track={t} rank={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
