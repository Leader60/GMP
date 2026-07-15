export const metadata = { title: "سياسة الخصوصية وشروط الاستخدام" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
      <h1 className="font-display text-3xl text-paper mb-8">
        سياسة الخصوصية وشروط الاستخدام
      </h1>

      <div className="space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="text-paper font-display text-xl mb-2">1. دور الوسيط</h2>
          <p>
            المنصة تعرض بيانات ووصفًا عامًا فقط، ولا تُعد طرفًا في أي عملية
            استماع أو تحميل أو شراء تتم على منصات خارجية.
          </p>
        </section>

        <section>
          <h2 className="text-paper font-display text-xl mb-2">2. الملكية الفكرية</h2>
          <p>
            جميع أسماء الأغاني والأغلفة وأسماء الفنانين والعلامات التجارية
            المذكورة ملك لأصحابها؛ ظهورها في المنصة لا يعني أي شراكة أو
            تأييد من تلك الجهات ما لم يُذكر صراحة.
          </p>
        </section>

        <section>
          <h2 className="text-paper font-display text-xl mb-2">3. الروابط الخارجية</h2>
          <p>
            المنصة غير مسؤولة عن محتوى أو سياسات أو توفر المواقع الخارجية
            التي تحيل إليها (مثل Spotify وApple Music).
          </p>
        </section>

        <section>
          <h2 className="text-paper font-display text-xl mb-2">4. دقة البيانات</h2>
          <p>
            البيانات المعروضة (تواريخ، ترتيب رواج، أعداد متابعين) مصدرها
            واجهات برمجية خارجية وقد تتأخر أو تختلف عن الواقع؛ لا تضمن
            المنصة دقتها الكاملة أو تحديثها اللحظي.
          </p>
        </section>

        <section>
          <h2 className="text-paper font-display text-xl mb-2">5. الاستخدام المقبول</h2>
          <p>
            يُمنع استخدام المنصة لأي غرض غير قانوني أو محاولة استخراج
            (scraping) بيانات المنصة بشكل آلي دون إذن.
          </p>
        </section>

        <section>
          <h2 className="text-paper font-display text-xl mb-2">6. التعديلات</h2>
          <p>
            يحق للمنصة تعديل هذه الشروط أو إيقاف أي خدمة دون إشعار مسبق.
          </p>
        </section>

        <section>
          <h2 className="text-paper font-display text-xl mb-2">7. حدود المسؤولية</h2>
          <p>
            تُقدَّم الخدمة "كما هي" دون أي ضمانات، ولا تتحمل المنصة مسؤولية
            أي ضرر ناتج عن استخدامها.
          </p>
        </section>

        <section>
          <h2 className="text-paper font-display text-xl mb-2">
            8. طلبات إزالة المحتوى (حقوق النشر)
          </h2>
          <p>
            إذا كنت صاحب حق وترى أن أحد العناصر المعروضة يخالف حقوقك، يرجى
            التواصل معنا عبر صفحة{" "}
            <a href="/contact" className="text-gold hover:underline">
              تواصل معنا
            </a>{" "}
            وسنستجيب في أقرب وقت ممكن.
          </p>
        </section>

        <p className="text-xs pt-4 border-t border-hairline/50">
          هذه بنود عامة شائعة الاستخدام وليست استشارة قانونية رسمية. يُنصح
          بمراجعة محامٍ مختص بقوانين حقوق النشر عند نمو المشروع أو بدء تحقيقه
          دخلًا.
        </p>
      </div>
    </div>
  );
}
