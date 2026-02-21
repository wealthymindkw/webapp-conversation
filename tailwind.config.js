/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    typography: require('./typography'),
    extend: {
      colors: {
        // درجات الرمادي والأسود للخلفيات والنصوص
        gray: {
          50: '#F9FAFB',  // نصوص فاتحة جداً
          100: '#E5E7EB',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          700: '#1F2937', // رمادي غامق للعناصر
          800: '#111827', // أغمق
          900: '#000000', // الأسود الملكي للخلفية الأساسية
        },
        // درجات الذهبي (البراند الخاص بـ Wealthy Mind)
        primary: {
          50: '#FDFCF0',
          100: '#FBF8E1',
          200: '#F7F0B4',
          300: '#F3E887',
          600: '#C5A059', // اللون الذهبي الأساسي في اللوغو
          700: '#A38446', // ذهبي أغمق للضغط (Active)
          800: '#8E6F3E',
        },
        // ألوان إضافية متناسقة مع الثيم الغامق
        blue: {
          500: '#1F2937',
        },
        indigo: {
          600: '#C5A059', // استبدال الانديغو بالذهبي لتوحيد البراند
        },
      },
      screens: {
        mobile: '100px',
        tablet: '640px',
        pc: '769px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
