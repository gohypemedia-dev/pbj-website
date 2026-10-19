import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import "lenis/dist/lenis.css";
import localFont from "next/font/local";

const iconicFont = localFont({
  src: "../public/fonts/Allura-Regular.ttf",
  variable: "--font-iconic",
  weight: "400",
  display: "swap",
});

const artistFont = localFont({
  src: "../public/fonts/AmaticSC-Bold.ttf",
  variable: "--font-artist",
  weight: "700",
  display: "swap",
});
import Header from "@/components/Header";
import IntroProvider from "@/components/IntroProvider";
import ScrollExperience from "@/components/ScrollExperience";
import Footer from "@/components/Footer";
import { artistData } from "@/data/artist";

export const metadata: Metadata = {
  metadataBase: new URL("https://prakashbaljoshi.com"),
  title: `${artistData.diacriticName} | Contemporary Abstract Artist & Writer`,
  description:
    "Official portfolio of Prakash Bal Joshi. Contemporary Indian abstract painter exploring the fluid metaphor of rivers, memory, urban realities, and spontaneous consciousness.",
  keywords: [
    "Prakash Bal Joshi",
    "Indian abstract artist",
    "Contemporary Indian Art",
    "Rivers of Life",
    "Mumbai artist",
    "Abstract expressionism"
  ],
  authors: [{ name: artistData.name }],
  openGraph: {
    title: `${artistData.diacriticName} | Contemporary Abstract Artist`,
    description: artistData.conciseIntro,
    url: "https://prakashbaljoshi.com",
    siteName: artistData.diacriticName,
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${artistFont.variable} ${iconicFont.variable} h-full`}>
      <body id="page-top" className="min-h-full flex flex-col bg-[#E9ECEF] text-[#38435C] selection:bg-[#1B2A49] selection:text-[#E9ECEF]">
        <IntroProvider>
        <ScrollExperience />
        {/* Skip to Main Content Link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-wider rounded"
        >
          Skip to main gallery content
        </a>

        {/* Global Art-Directed Header */}
        <Header />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Global Editorial Footer */}
        <Footer />
        </IntroProvider>
      </body>
    </html>
  );
}
