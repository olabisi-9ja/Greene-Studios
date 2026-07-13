import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

const inter = Inter({
 subsets: ["latin"],
 variable: "--font-inter",
 display: "swap",
});

export const viewport: import("next").Viewport = {
 width: "device-width",
 initialScale: 1,
 maximumScale: 1,
};

export const metadata: Metadata = {
 metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://greenestudios.co"),
 title: {
 default: "Greene Studios — Digital Design & Development Agency",
 template: "%s | Greene Studios",
 },
 description:
 "Greene Studios is a premium digital design and development agency. We craft world-class websites, brands, and digital products that move people.",
 keywords: [
 "web design agency",
 "UI/UX design",
 "branding agency",
 "frontend development",
 "design studio",
 "Greene Studios",
 ],
 authors: [{ name: "Greene Studios" }],
 creator: "Greene Studios",
 openGraph: {
 type: "website",
 locale: "en_US",
 url: "https://greenestudios.co",
 siteName: "Greene Studios",
 title: "Greene Studios — Digital Design & Development Agency",
 description:
 "Premium digital design and development agency. Websites, brands, and products that move people.",
 },
 twitter: {
 card: "summary_large_image",
 title: "Greene Studios — Digital Design & Development Agency",
 description: "Premium digital design and development agency.",
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
 <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
 <body className="antialiased mode-clean overflow-x-hidden">
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
