import TrackCard from "@/components/TrackCard";
import { getNewReleases } from "@/lib/spotify";
import type { Track } from "@/lib/types";

export const revalidate = 3600;
export const metadata = { title: "أحدث الإصدارات" };

export default async function LatestPage() {
  const albums = await getNewReleases(50).catch(() => []);

  const tracks: Track[] = albums.map((a) => ({
    id: a.id,
    name: a.name,
    artists: a.artists,
    album: a,
    external_urls: a.external_urls,
    duration_ms: 0,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl text-paper mb-2">أحدث الإصدارات</h1>
      <p className="text-muted mb-8">أحدث الألبومات والأغاني المنفردة عالميًا، محدثة تلقائيًا.</p>

      {tracks.length === 0 ? (
        <p className="text-muted">تعذّر تحميل البيانات حاليًا، حاول لاحقًا.</p>
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
