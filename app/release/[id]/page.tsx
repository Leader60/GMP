import Image from "next/image";
import Link from "next/link";
import { getAlbum, getTrack } from "@/lib/spotify";
import { notFound } from "next/navigation";
import type { AlbumSimplified, Track } from "@/lib/types";

export const revalidate = 3600;

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * هذه الصفحة تستقبل إمّا معرّف أغنية (track id) أو معرّف ألبوم/إصدار
 * (album id) — لأن الموقع يربط لها من أماكن مختلفة (قوائم الرواج تستخدم
 * أغاني، وصفحة "أحدث الإصدارات" تستخدم ألبومات). نحاول أغنية أولًا، ثم
 * نرجع لتجربتها كألبوم.
 */
export default async function ReleasePage({ params }: { params: { id: string } }) {
  const track = await getTrack(params.id).catch(() => null);
  const album: (AlbumSimplified & { tracks?: { items: Track[] } }) | null = track
    ? await getAlbum(track.album.id).catch(() => null)
    : await getAlbum(params.id).catch(() => null);

  if (!track && !album) notFound();

  const displayName = track?.name ?? album?.name ?? "";
  const cover = (track?.album?.images ?? album?.images)?.[0]?.url;
  const artistNames = (track?.artists ?? album?.artists)?.map((a) => a.name).join("، ");
  const releaseDate = track?.album?.release_date ?? album?.release_date;
  const spotifyUrl = track?.external_urls?.spotify ?? album?.external_urls?.spotify;
  const tracklist = album?.tracks?.items ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        {cover && (
          <div className="relative h-56 w-56 shrink-0 rounded-xl overflow-hidden ring-1 ring-hairline shadow-2xl shadow-black/40">
            <Image src={cover} alt={displayName} fill sizes="224px" className="object-cover" />
          </div>
        )}

        <div className="text-center sm:text-start">
          {releaseDate && (
            <p className="text-gold font-mono text-sm mb-2">
              {new Date(releaseDate).toLocaleDateString("ar")}
            </p>
          )}
          <h1 className="font-display text-3xl sm:text-4xl text-paper" dir="auto">{displayName}</h1>
          <p className="mt-2 text-lg text-muted" dir="auto">{artistNames}</p>

          {spotifyUrl && (
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 rounded-full bg-gold text-ink px-6 py-2.5 font-medium hover:bg-gold/90 transition-colors"
            >
              استمع على Spotify
            </a>
          )}
        </div>
      </div>

      {tracklist.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl text-paper mb-4">قائمة الأغاني في الإصدار</h2>
          <ol className="divide-y divide-hairline/50">
            {tracklist.map((t, i) => (
              <li key={t.id} className="flex items-center gap-4 py-3">
                <span className="font-mono text-muted w-6 text-center shrink-0">{i + 1}</span>
                <Link href={`/release/${t.id}`} className="flex-1 min-w-0 hover:text-gold transition-colors">
                  <span className="truncate block" dir="auto">{t.name}</span>
                </Link>
                {t.duration_ms > 0 && (
                  <span className="font-mono text-sm text-muted shrink-0">
                    {formatDuration(t.duration_ms)}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
