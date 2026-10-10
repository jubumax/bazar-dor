import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Noto_Serif_Bengali } from "next/font/google";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import {
  CategoryNavData,
  PriceTickerData,
} from "@/src/components/layout/LayoutData";
import { NavSkeleton, TickerSkeleton } from "@/src/components/ui/Skeletons";
import ToasterProvider from "@/src/components/ToasterProvider";

const NotoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর | Bazar Dor",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজার দর এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${NotoSerifBengali.className} h-full antialiased`}
    >
      <body>
        <div className="sticky top-0 z-50 bg-[#FAFCFA]">
          <Header />
          <Suspense fallback={<NavSkeleton />}>
            <CategoryNavData />
          </Suspense>
        </div>

        <Suspense fallback={<TickerSkeleton />}>
          <PriceTickerData />
        </Suspense>

        {children}

        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
