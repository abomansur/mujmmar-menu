import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 👇 هنا التعديل المهم (الاسم + الوصف + الأيقونة)
export const metadata = {
  title: "مطعم مجمّر | Mujmmar",
  description: "أصل الشوي على الفحم",
  icons: {
    icon: '/images/logo-new.png', // أيقونة المتصفح
    apple: '/images/logo-new.png', // أيقونة الايفون
  },
};

export default function RootLayout({ children }) {
  return (
    // 👇 تم تغيير اللغة إلى العربية والاتجاه من اليمين لليسار
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
