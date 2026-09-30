import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Real font used by vanikmode.com ("site-font" / "Liana FD"). Commercial
// font (fontiran.com) — kept local-only per the licensing decision in
// tasks.md: never commit these .ttf files, never deploy this font publicly.
// See src/app/fonts/README.md.
const liana = localFont({
  src: [
    { path: "./fonts/Liana-FD-Light.ttf", weight: "100 300", style: "normal" },
    { path: "./fonts/Liana-FD-Regular.ttf", weight: "400 500", style: "normal" },
    { path: "./fonts/Liana-FD-Bold.ttf", weight: "600 700", style: "normal" },
    { path: "./fonts/Liana-FD-Black.ttf", weight: "800 900", style: "normal" },
  ],
  variable: "--font-liana",
  display: "swap",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "خرید لباس زنانه | فروشگاه وانیک",
  description:
    "خرید اینترنتی انواع لباس در فروشگاه اینترنتی پوشاک زنانه شعبه ی حضوری در شهر رشت و ارسال سریع به سراسر کشور با بیش از 6 سال سابقه",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" className={liana.variable}>
      <body dir="rtl" className="min-h-full flex flex-col antialiased pb-16 nav:pb-0">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
