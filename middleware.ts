import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. تحديد الصفحات المحمية (هنا حطينا '(.*)/' يعني كل صفحات الموقع محميّة)
const isProtectedRoute = createRouteMatcher(['/(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // 2. إذا المستخدم حاول يدخل صفحة محمية وهو مو مسجل دخول، اطلب منه يسجل دخول غصب
  if (isProtectedRoute(req)) {
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
