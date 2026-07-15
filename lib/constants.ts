/**
 * قائمة تشغيل "Top 50 - Global" الرسمية من Spotify، تُستخدم كمصدر لصفحة
 * "الأكثر رواجًا" عالميًا. يمكن تغيير المعرّف من متغيرات البيئة إذا لزم.
 */
export const GLOBAL_CHART_PLAYLIST_ID =
  process.env.SPOTIFY_GLOBAL_CHART_PLAYLIST_ID || "37i9dQZEVXbMDoHDwVN2tF";

/**
 * خريطة قوائم "Top 50" الرسمية حسب الدولة. Spotify ينشر قائمة تحريرية
 * لكل دولة تقريبًا. أضف المزيد بنفس الطريقة:
 * 1) افتح Spotify وابحث عن "Top 50 - <اسم الدولة>"
 * 2) من قائمة التشغيل اختر "مشاركة" → "نسخ رابط"
 * 3) المعرّف هو الجزء بعد /playlist/ وقبل ?si=
 */
export const COUNTRY_CHART_PLAYLISTS: Record<string, string> = {
  global: GLOBAL_CHART_PLAYLIST_ID,
  // مثال: US: "37i9dQZEVXbLRQDuF5jeGp",
};

export const COUNTRIES: { code: string; name: string }[] = [
  { code: "global", name: "عالميًا" },
  { code: "US", name: "الولايات المتحدة" },
  { code: "GB", name: "بريطانيا" },
  { code: "SA", name: "السعودية" },
  { code: "EG", name: "مصر" },
  { code: "AE", name: "الإمارات" },
  { code: "KW", name: "الكويت" },
  { code: "FR", name: "فرنسا" },
  { code: "DE", name: "ألمانيا" },
  { code: "JP", name: "اليابان" },
  { code: "KR", name: "كوريا الجنوبية" },
  { code: "BR", name: "البرازيل" },
  { code: "IN", name: "الهند" },
];

export const GENRES: { slug: string; label: string }[] = [
  { slug: "pop", label: "بوب" },
  { slug: "hip-hop", label: "هيب هوب" },
  { slug: "rock", label: "روك" },
  { slug: "arabic", label: "عربي" },
  { slug: "electronic", label: "إلكترونية" },
  { slug: "r&b", label: "آر آند بي" },
  { slug: "k-pop", label: "كي بوب" },
  { slug: "latin", label: "لاتينية" },
  { slug: "jazz", label: "جاز" },
  { slug: "classical", label: "كلاسيكية" },
];

export const SITE_NAME = "نبض الموسيقى العالمي";
export const SITE_NAME_EN = "Global Music Pulse";
