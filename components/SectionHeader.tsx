import Link from "next/link";

export default function SectionHeader({
  title,
  href,
  hrefLabel = "عرض الكل",
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex items-baseline justify-between mb-5">
      <h2 className="font-display text-2xl text-paper">{title}</h2>
      {href && (
        <Link href={href} className="text-sm text-gold hover:underline shrink-0">
          {hrefLabel} ←
        </Link>
      )}
    </div>
  );
}
