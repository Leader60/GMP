"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="ابحث عن أغنية أو فنان..."
        className={`w-full rounded-full border border-hairline bg-surface text-paper placeholder:text-muted focus:border-gold outline-none transition-colors ps-9 ${
          compact ? "pe-4 py-2 text-sm" : "pe-5 py-3"
        }`}
      />
      <button
        type="submit"
        aria-label="بحث"
        className="absolute start-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold"
      >
        ⌕
      </button>
    </form>
  );
}
