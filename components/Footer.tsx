import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-hairline/60 mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-lg text-paper mb-2">{SITE_NAME}</p>
          <p className="text-muted leading-relaxed">
            منصة تجميعية تعرض بيانات عامة عن الإصدارات الموسيقية. جميع الحقوق
            محفوظة لأصحابها الأصليين، وكل رابط استماع يحيل للمنصة الرسمية.
          </p>
        </div>

        <div>
          <p className="text-paper mb-3">روابط سريعة</p>
          <ul className="space-y-2 text-muted">
            <li><Link href="/latest" className="hover:text-paper">أحدث الإصدارات</Link></li>
            <li><Link href="/trending" className="hover:text-paper">الأكثر رواجًا</Link></li>
            <li><Link href="/search" className="hover:text-paper">البحث</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-paper mb-3">عن الموقع</p>
          <ul className="space-y-2 text-muted">
            <li><Link href="/about" className="hover:text-paper">من نحن</Link></li>
            <li><Link href="/privacy" className="hover:text-paper">سياسة الخصوصية وشروط الاستخدام</Link></li>
            <li><Link href="/contact" className="hover:text-paper">تواصل معنا</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline/60 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {SITE_NAME} — البيانات مصدرها Spotify API
      </div>
    </footer>
  );
}
