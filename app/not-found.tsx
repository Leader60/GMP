import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-mono text-gold text-sm mb-3">404</p>
      <h1 className="font-display text-3xl text-paper mb-4">
        لم نعثر على هذه الصفحة
      </h1>
      <p className="text-muted mb-8">
        ربما تم نقل المحتوى أو أن الرابط غير صحيح.
      </p>
      <Link
        href="/"
        className="inline-block rounded-full bg-gold text-ink px-6 py-2.5 font-medium hover:bg-gold/90 transition-colors"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
