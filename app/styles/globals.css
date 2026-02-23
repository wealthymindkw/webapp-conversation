@tailwind base;
@tailwind components;
@tailwind utilities;

/* ========================================== */
/* 1. الخلفية الأساسية الموحدة (ChatGPT Style) */
/* ========================================== */
html, body, #app-container, main, .chat-container {
    background-color: #212121 !important;
    color: #ECECEC !important;
    min-height: 100vh !important;
}

/* ========================================== */
/* 2. قتل الخطوط البيضاء (Borders) في كل الموقع */
/* ========================================== */
* {
    border-color: transparent !important;
}
[class*="border-gray-"], [class*="border-t"], [class*="border-r"], [class*="border-b"], [class*="border-l"] {
    border-width: 0 !important;
    border-color: transparent !important;
}

/* ========================================== */
/* 3. الشريط الجانبي والهيدر */
/* ========================================== */
aside, .sidebar, div[class*="w-[240px]"] {
    background-color: #171717 !important; /* رمادي أغمق شوي */
}

header, div[class*="h-16"] {
    background-color: #212121 !important;
}

/* لون تحديد المحادثة النشطة (اللي كان يطلع أبيض) */
.bg-primary-50, div[class*="bg-primary-50"] {
    background-color: #2F2F2F !important;
    color: #ECECEC !important;
    border-radius: 8px !important;
}

/* ========================================== */
/* 4. تنظيف المربعات البيضاء ورا الأيقونات */
/* ========================================== */
/* مسح أي خلفية بيضاء أو زرقاء مخفية تابعة لـ Dify */
.bg-white, div[class*="bg-blue-100"], div[class*="bg-primary-100"] {
    background-color: transparent !important;
}

/* إعداد صورتك الشخصية بشكل دائري نظيف */
.app-icon, header .app-icon, div[class*="w-8 h-8"], div[class*="w-10 h-10"] {
    background-color: transparent !important;
    border-radius: 50% !important;
    background-image: url(https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/69984ecd63ae7520d51f9030.png) !important;
    background-size: cover !important;
    background-position: center !important;
}
/* إخفاء الأيقونات القديمة */
.app-icon svg, header svg:first-child, .app-icon img, div[class*="w-8 h-8"] svg {
    display: none !important;
}

/* ========================================== */
/* 5. فقاعات المحادثة (مسطحة ونظيفة) */
/* ========================================== */
/* فقاعة المستخدم */
.mr-2.py-3.px-4.bg-blue-500, div[class*="bg-blue-500"] {
    background-color: #2F2F2F !important;
    color: #ECECEC !important;
    border-radius: 20px !important;
}
/* فقاعة البوت */
.ml-2.py-3.px-4.bg-gray-100, div[class*="bg-gray-100"] {
    background-color: transparent !important;
    color: #ECECEC !important;
}

/* ========================================== */
/* 6. صندوق الكتابة (الترتيب النهائي) */
/* ========================================== */
/* الحاوية السفلية */
div[class*="absolute bottom-0"]:has(textarea), div[class*="p-4"]:has(textarea) {
    background: transparent !important;
    padding-bottom: 24px !important;
}

/* الصندوق نفسه */
div[class*="relative"]:has(> textarea), div[class*="flex"]:has(> textarea) {
    background-color: #2F2F2F !important;
    border-radius: 24px !important;
    padding: 12px 50px 12px 16px !important;
    margin: 0 auto !important;
    max-width: 768px !important; /* يمنعه من التمدد البشع */
    width: 100% !important;
}

textarea {
    background: transparent !important;
    color: #ECECEC !important;
    font-size: 16px !important;
    margin: 0 !important;
    padding: 0 !important;
}
textarea:focus { outline: none !important; }

/* زر الإرسال */
div:has(> textarea) button, div:has(> textarea) div[class*="bg-primary"] {
    position: absolute !important;
    right: 8px !important;
    bottom: 8px !important;
    background-color: #ECECEC !important; /* زر أبيض/فاتح */
    border-radius: 50% !important;
    width: 32px !important;
    height: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 !important;
}
div:has(> textarea) svg { color: #212121 !important; width: 16px !important; } /* سهم غامق */

/* ========================================== */
/* 7. نسف الرقم صفر (0) والنصوص المزعجة */
/* ========================================== */
div[class*="text-xs"], .text-xs, #send-tip, .rc-tooltip, div:has(> textarea) + div span {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
}

/* ========================================== */
/* 8. إخفاء شعار Dify وتوحيد ألوان الأزرار */
/* ========================================== */
a[href*="dify.ai"], .powered-by, img[alt*="dify"] { display: none !important; }

.text-gray-900, .text-gray-800, .text-gray-700, .text-gray-600 { color: #ECECEC !important; }
h1, h2, .font-bold, .font-medium { color: #ECECEC !important; }

button[class*="bg-primary"], .btn-primary {
    background-color: #2F2F2F !important;
    color: #ECECEC !important;
}
