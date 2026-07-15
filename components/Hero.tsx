import Image from "next/image";
import Link from "next/link";
import type { Track } from "@/lib/types";

export default function Hero({ track }: { track: Track | null }) {
  if (!track) {
    return (
      <section className="border-b border-hairline/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <h1 className="font-display text-4xl sm:text-5xl text-paper">
            نبض الموسيقى، لحظة بلحظة
          </h1>
        </div>
      </section>
    );
  }

  const cover = track.album?.images?.[0]?.url;
  const artistNames = track.artists?.map((a) => a.name).join("، ");

  return (
    <section className="relative border-b border-hairline/60 overflow-hidden">
      {cover && (
        <div className="absolute inset-0 -z-10">
          <Image src={cover} alt="" fill className="object-cover blur-3xl opacity-25 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 grid gap-10 sm:grid-cols-[auto,1fr] items-center">
        {cover && (
          <div className="relative h-48 w-48 sm:h-64 sm:w-64 shrink-0 mx-auto sm:mx-0 rounded-2xl overflow-hidden ring-1 ring-hairline shadow-2xl shadow-black/50">
            <Image src={cover} alt={track.name} fill sizes="256px" className="object-cover" />
          </div>
        )}

        <div className="text-center sm:text-start">
          <p className="text-gold font-mono text-sm tracking-widest mb-3">
            الإصدار المميّز الآن
          </p>
          <h1 className="font-display text-3xl sm:text-5xl text-paper leading-tight" dir="auto">
            {track.name}
          </h1>
          <p className="mt-3 text-muted text-lg" dir="auto">{artistNames}</p>

          <div className="mt-6 flex gap-3 justify-center sm:justify-start">
            <a
              href={track.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold text-ink px-6 py-2.5 font-medium hover:bg-gold/90 transition-colors"
            >
              استمع الآن
            </a>
            <Link
              href={`/release/${track.id}`}
              className="rounded-full border border-hairline px-6 py-2.5 text-paper hover:border-gold transition-colors"
            >
              التفاصيل
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
