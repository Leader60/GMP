import Link from "next/link";
import SearchBar from "./SearchBar";
import { SITE_NAME } from "@/lib/constants";

const LINKS = [
  { href: "/latest", label: "أحدث الإصدارات" },
  { href: "/trending", label: "الأكثر رواجًا" },
  { href: "/country/global", label: "حسب الدولة" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline/60 bg-ink/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="shrink-0 font-display text-xl font-semibold tracking-tight text-paper">
            <span className="text-gold">◆</span> {SITE_NAME}
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-paper transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="w-full max-w-[220px] sm:max-w-xs">
            <SearchBar compact />
          </div>
        </div>

        <nav className="flex md:hidden gap-5 pb-3 text-sm text-muted overflow-x-auto">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap hover:text-paper transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
