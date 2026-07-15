import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/lib/types";

export default function ArtistCard({ artist }: { artist: Artist }) {
  const photo = artist.images?.[0]?.url;

  return (
    <Link href={`/artist/${artist.id}`} className="group text-center w-32 shrink-0">
      <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full bg-surface2 ring-1 ring-hairline/60 group-hover:ring-gold/60 transition-all">
        {photo && (
          <Image src={photo} alt={artist.name} fill sizes="112px" className="object-cover" />
        )}
      </div>
      <p className="mt-2 text-sm text-paper truncate" dir="auto">{artist.name}</p>
    </Link>
  );
}
