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

export const metadata = {
  title: "مطعم مجمّر | Mujmmar", // 👈 هنا العنوان الجديد
  description: "أصل الشوي على الفحم",
  icons: {
    icon: '/images/logo-new.png', // 👈 هنا استبدلنا الأيقونة بشعارك
    apple: '/images/logo-new.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl"> {/* 👈 ضبطنا اللغة والاتجاه */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}