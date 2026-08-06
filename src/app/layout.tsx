import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

export const viewport: import("next").Viewport = {
 width: "device-width",
 initialScale: 1,
 maximumScale: 1,
};

export const metadata: Metadata = {
 metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://greenestudios.co"),
  title: {
    default: "Greene Studios · Independent Digital Design Studio",
 template: "%s | Greene Studios",
 },
 description:
 "Greene Studios is an independent digital design studio in Lagos. We design & build brands, websites, and digital products that make people stop scrolling.",
 keywords: [
 "web design agency",
 "UI/UX design",
 "branding agency",
 "frontend development",
 "design studio",
 "Greene Studios",
 "Lagos design studio",
 ],
 authors: [{ name: "Greene Studios" }],
 creator: "Greene Studios",
 openGraph: {
 type: "website",
 locale: "en_US",
 url: "https://greenestudios.co",
 siteName: "Greene Studios",
 title: "Greene Studios · Independent Digital Design Studio",
 description:
 "Independent digital design studio. Brands, websites, and products that make people stop scrolling.",
 },
 twitter: {
 card: "summary_large_image",
 title: "Greene Studios · Independent Digital Design Studio",
 description: "Brands, websites, and products that make people stop scrolling.",
 creator: "@greenestudios",
 },
 robots: {
 index: true,
 follow: true,
 },
 icons: {
 icon: "/logo.png",
 shortcut: "/logo.png",
 apple: "/logo.png",
 },
};

import { AtmosphereProvider } from "@/lib/context/AtmosphereContext";
import DynamicCursor from "@/components/ui/DynamicCursor";
import NoiseTexture from "@/components/canvas/NoiseTexture";
import ScrollProgress from "@/components/animations/ScrollProgress";
import FloatingButtons from "@/components/FloatingButtons";
import PageTransition from "@/components/animations/PageTransition";

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="en" suppressHydrationWarning className="font-sans">
 <body className="antialiased mode-paper overflow-x-hidden">
 <AtmosphereProvider>
 <ScrollProgress />
 <NoiseTexture />
 <DynamicCursor />
 <Preloader />
 <SmoothScroll>
 <Navbar />
 <main>
 <PageTransition>
 {children}
 </PageTransition>
 </main>
 <Footer />
 <FloatingButtons />
 </SmoothScroll>
 </AtmosphereProvider>
 </body>
 </html>
 );
}
