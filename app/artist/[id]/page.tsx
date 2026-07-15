import Image from "next/image";
import TrackCard from "@/components/TrackCard";
import SectionHeader from "@/components/SectionHeader";
import { getArtist, getArtistTopTracks, getArtistAlbums } from "@/lib/spotify";
import { notFound } from "next/navigation";
import type { Track } from "@/lib/types";

export const revalidate = 3600;

export default async function ArtistPage({ params }: { params: { id: string } }) {
  const [artistRes, tracksRes, albumsRes] = await Promise.allSettled([
    getArtist(params.id),
    getArtistTopTracks(params.id),
    getArtistAlbums(params.id),
  ]);

  if (artistRes.status !== "fulfilled") notFound();
  const artist = artistRes.value;
  const topTracks = tracksRes.status === "fulfilled" ? tracksRes.value : [];
  const albums = albumsRes.status === "fulfilled" ? albumsRes.value : [];

  const photo = artist.images?.[0]?.url;
  const followers = artist.followers?.total?.toLocaleString("ar");

  const albumsAsTracks: Track[] = albums.map((a) => ({
    id: a.id,
    name: a.name,
    artists: a.artists,
    album: a,
    external_urls: a.external_urls,
    duration_ms: 0,
  }));

  return (
    <div>
      <section className="border-b border-hairline/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center gap-8">
          {photo && (
            <div className="relative h-40 w-40 sm:h-52 sm:w-52 shrink-0 rounded-full overflow-hidden ring-1 ring-hairline">
              <Image src={photo} alt={artist.name} fill sizes="208px" className="object-cover" />
            </div>
          )}
          <div className="text-center sm:text-start">
            <h1 className="font-display text-4xl text-paper" dir="auto">{artist.name}</h1>
            {artist.genres?.length > 0 && (
              <p className="text-muted mt-2">{artist.genres.slice(0, 4).join(" · ")}</p>
            )}
            {followers && (
              <p className="text-sm text-muted mt-1 font-mono">{followers} متابع على Spotify</p>
            )}
            <a
              href={artist.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 rounded-full bg-gold text-ink px-6 py-2.5 font-medium hover:bg-gold/90 transition-colors"
            >
              فتح صفحة الفنان على Spotify
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <SectionHeader title="الأغاني الأكثر استماعًا" />
        {topTracks.length === 0 ? (
          <p className="text-muted">لا تتوفر بيانات كافية حاليًا.</p>
        ) : (
          <div className="shelf">
            {topTracks.slice(0, 10).map((t) => (
              <TrackCard key={t.id} track={t} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <SectionHeader title="أحدث الإصدارات" />
        {albumsAsTracks.length === 0 ? (
          <p className="text-muted">لا تتوفر إصدارات حديثة.</p>
        ) : (
          <div className="shelf">
            {albumsAsTracks.map((t) => (
              <TrackCard key={t.id} track={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
