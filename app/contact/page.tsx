export const metadata = { title: "تواصل معنا" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
      <h1 className="font-display text-3xl text-paper mb-6">تواصل معنا</h1>
      <p className="text-muted leading-relaxed mb-6">
        لأي استفسار، اقتراح، أو طلب متعلق بحقوق النشر (Takedown request)،
        يمكنك التواصل معنا عبر البريد الإلكتروني التالي:
      </p>
      <a
        href="mailto:contact@example.com"
        className="inline-block rounded-full border border-hairline px-6 py-2.5 text-paper hover:border-gold hover:text-gold transition-colors"
      >
        contact@example.com
      </a>
      <p className="text-xs text-muted mt-6">
        غيّر هذا البريد إلى بريدك الفعلي في app/contact/page.tsx قبل النشر.
      </p>
    </div>
  );
}
