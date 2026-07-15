import ChartRow from "@/components/ChartRow";
import Link from "next/link";
import { getPlaylistTracks } from "@/lib/spotify";
import { GLOBAL_CHART_PLAYLIST_ID, COUNTRIES } from "@/lib/constants";

export const revalidate = 1800;
export const metadata = { title: "الأكثر رواجًا" };

export default async function TrendingPage() {
  const tracks = await getPlaylistTracks(GLOBAL_CHART_PLAYLIST_ID, 50).catch(() => []);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl text-paper mb-2">الأكثر رواجًا عالميًا</h1>
      <p className="text-muted mb-6">
        قائمة محدّثة دوريًا من الأغاني الأكثر استماعًا حول العالم.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {COUNTRIES.slice(0, 6).map((c) => (
          <Link
            key={c.code}
            href={`/country/${c.code}`}
            className="rounded-full border border-hairline px-4 py-1.5 text-sm text-muted hover:border-gold hover:text-gold transition-colors"
          >
            {c.name}
          </Link>
        ))}
      </div>

      {tracks.length === 0 ? (
        <p className="text-muted">تعذّر تحميل البيانات حاليًا، حاول لاحقًا.</p>
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
