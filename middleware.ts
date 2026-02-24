import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. تحديد الصفحات المحمية (هنا حطينا '(.*)/' يعني كل صفحات الموقع محميّة)
const isProtectedRoute = createRouteMatcher(['/(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // 🚀 2. سحب هوية الزائر (هل هو إنسان ولا روبوت واتساب/تيليجرام؟) 🚀
  const userAgent = req.headers.get('user-agent') || '';
  const isBot = /bot|whatsapp|telegram|twitter|facebook|linkedin|skype|viber/i.test(userAgent);

  // 🚀 3. إذا كان إنسان (مو روبوت) وحاول يدخل، اطلب منه يسجل دخول غصب 🚀
  // أما الروبوتات فراح نعطيهم استثناء يقرأون الـ SEO عشان تطلع الصورة!
  if (isProtectedRoute(req) && !isBot) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
