import Image from "next/image";
import Link from "next/link";
import type { Track } from "@/lib/types";

export default function TrackCard({
  track,
  fluid = false,
}: {
  track: Track;
  /** استخدم fluid داخل شبكات (grid) بدل الرفوف الأفقية القابلة للتمرير */
  fluid?: boolean;
}) {
  const cover = track.album?.images?.[0]?.url;
  const artistNames = track.artists?.map((a) => a.name).join("، ");

  return (
    <Link
      href={`/release/${track.id}`}
      className={`group block ${fluid ? "w-full" : "w-40 sm:w-48 shrink-0"}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-surface2 ring-1 ring-hairline/60 group-hover:ring-gold/60 transition-all">
        {cover && (
          <Image
            src={cover}
            alt={track.name}
            fill
            sizes="200px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <p className="mt-2 text-sm text-paper truncate" dir="auto">{track.name}</p>
      <p className="text-xs text-muted truncate" dir="auto">{artistNames}</p>
    </Link>
  );
}
