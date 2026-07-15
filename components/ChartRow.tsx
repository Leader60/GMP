import Image from "next/image";
import Link from "next/link";
import type { Track } from "@/lib/types";

export default function ChartRow({
  track,
  rank,
}: {
  track: Track;
  rank: number;
}) {
  const cover = track.album?.images?.[0]?.url;
  const artistNames = track.artists?.map((a) => a.name).join("، ");

  return (
    <Link
      href={`/release/${track.id}`}
      className="group relative flex items-center gap-4 py-3 border-b border-hairline/50 hover:bg-surface/60 rounded-lg px-2 -mx-2 transition-colors"
    >
      <span className="font-mono text-4xl sm:text-5xl font-semibold rank-number w-14 text-center shrink-0 transition-colors group-hover:text-gold group-hover:[-webkit-text-stroke:0px]">
        {rank}
      </span>

      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-surface2 ring-1 ring-hairline/60">
        {cover && <Image src={cover} alt={track.name} fill sizes="56px" className="object-cover" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-paper truncate" dir="auto">{track.name}</p>
        <p className="text-sm text-muted truncate" dir="auto">{artistNames}</p>
      </div>
    </Link>
  );
}
