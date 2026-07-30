import PiPaymentTest from "@/components/PiPaymentTest";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import TrackCard from "@/components/TrackCard";
import ChartRow from "@/components/ChartRow";
import { getNewReleases, getPlaylistTracks } from "@/lib/spotify";
import { GLOBAL_CHART_PLAYLIST_ID, GENRES } from "@/lib/constants";
import Link from "next/link";
import type { Track } from "@/lib/types";

export const revalidate = 3600;

export default async function HomePage() {
  const [releases, chart] = await Promise.allSettled([
    getNewReleases(24),
    getPlaylistTracks(GLOBAL_CHART_PLAYLIST_ID, 10),
  ]);
  const latestAlbums = releases.status === "fulfilled" ? releases.value : [];
  const chartTracks: Track[] = chart.status === "fulfilled" ? chart.value : [];
  const heroTrack = chartTracks[0] ?? null;

  const latestAsTracks: Track[] = latestAlbums.map((a) => ({
    id: a.id,
    name: a.name,
    artists: a.artists,
    album: a,
    external_urls: a.external_urls,
    duration_ms: 0,
  }));

  return (
    <div>
      <Hero track={heroTrack} />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <SectionHeader title="أحدث الإصدارات" href="/latest" />
        {latestAsTracks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="shelf">
            {latestAsTracks.map((t) => (
              <TrackCard key={t.id} track={t} />
            ))}
          </div>
        )}
      </section>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <SectionHeader title="الأكثر رواجًا الآن" href="/trending" />
        {chartTracks.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {chartTracks.slice(0, 10).map((t, i) => (
              <ChartRow key={t.id} track={t} rank={i + 1} />
            ))}
          </div>
        )}
      </section>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <SectionHeader title="تصفّح حسب النوع الموسيقي" />
        <div className="flex flex-wrap gap-3">
          {GENRES.map((g) => (
            <Link
              key={g.slug}
              href={`/genre/${g.slug}`}
              className="rounded-full border border-hairline px-5 py-2.5 text-sm text-paper hover:border-gold hover:text-gold transition-colors"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 text-center">
        <PiPaymentTest />
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-hairline p-10 text-center text-muted">
      <p>تعذّر تحميل البيانات حاليًا.</p>
      <p className="text-sm mt-1">
        تأكد من إعداد متغيرات SPOTIFY_CLIENT_ID و SPOTIFY_CLIENT_SECRET — راجع ملف README.
      </p>
    </div>
  );
}
