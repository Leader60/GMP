import SearchBar from "@/components/SearchBar";
import TrackCard from "@/components/TrackCard";
import ArtistCard from "@/components/ArtistCard";
import SectionHeader from "@/components/SectionHeader";
import { searchAll } from "@/lib/spotify";

export const revalidate = 60;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q?.trim() ?? "";
  const results = q ? await searchAll(q).catch(() => null) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl text-paper mb-6">البحث</h1>
      <div className="max-w-xl mb-10">
        <SearchBar />
      </div>

      {!q && <p className="text-muted">اكتب اسم أغنية أو فنان لبدء البحث.</p>}

      {q && !results && <p className="text-muted">تعذّر تنفيذ البحث حاليًا، حاول لاحقًا.</p>}

      {results && (
        <div className="space-y-12">
          {results.artists?.items?.length > 0 && (
            <section>
              <SectionHeader title="فنانون" />
              <div className="shelf">
                {results.artists.items.map((a) => (
                  <ArtistCard key={a.id} artist={a} />
                ))}
              </div>
            </section>
          )}

          {results.tracks?.items?.length > 0 && (
            <section>
              <SectionHeader title="أغانٍ" />
              <div className="shelf">
                {results.tracks.items.map((t) => (
                  <TrackCard key={t.id} track={t} />
                ))}
              </div>
            </section>
          )}

          {results.albums?.items?.length > 0 && (
            <section>
              <SectionHeader title="ألبومات وإصدارات" />
              <div className="shelf">
                {results.albums.items.map((al) => (
                  <TrackCard
                    key={al.id}
                    track={{
                      id: al.id,
                      name: al.name,
                      artists: al.artists,
                      album: al,
                      external_urls: al.external_urls,
                      duration_ms: 0,
                    }}
                  />
                ))}
              </div>
            </section>
          )}

          {!results.artists?.items?.length &&
            !results.tracks?.items?.length &&
            !results.albums?.items?.length && (
              <p className="text-muted">لا توجد نتائج لـ "{q}".</p>
            )}
        </div>
      )}
    </div>
  );
}
