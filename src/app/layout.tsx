import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

export const viewport: import("next").Viewport = {
 width: "device-width",
 initialScale: 1,
};

export const metadata: Metadata = {
 metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app"),
  title: {
    default: "Greene Studios · Independent Digital Design Studio",
 template: "%s | Greene Studios",
 },
 description:
 "Greene Studios is an independent digital design studio. We design & build brands, websites, and digital products that make people stop scrolling.",
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
import StudioParticles from "@/components/canvas/StudioParticles";
import FocusMode from "@/components/FocusMode";
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
 <body className="antialiased overflow-x-hidden">
 {/* Apply the saved atmosphere before hydration so there is no flash of
     the wrong theme. Plain inline <script> inside <body> (not next/script,
     which renders as a child of <html> and breaks hydration). */}
 <script
   dangerouslySetInnerHTML={{
     __html: `(function(){
   try {
     var m = localStorage.getItem("greene:atmosphere");
     if (m === "paper") m = "day";
     if (m === "midnight") m = "night";
     if (m !== "auto" && m !== "day" && m !== "night" && m !== "studio" && m !== "raw") m = "auto";
     var p = location.pathname;
     if (m === "auto") {
       if (p.indexOf("/work") === 0) m = "night";
       else if (p.indexOf("/lab") === 0 || p.indexOf("/experiments") === 0) m = "studio";
       else if (p === "/contact") m = "night";
       else m = "day";
     }
     var d = document.documentElement;
     d.classList.add("mode-" + m);
     d.setAttribute("data-mode", m);
     if (m === "studio") {
       var a = localStorage.getItem("greene:studio-accent");
       var hex = {
         forest: "#2F5D4E", moss: "#8FAE7B", teal: "#2EC4B6",
         lime: "#C9F24B", amber: "#FFB25C", violet: "#8B7CF6",
         coral: "#FF6F61", blue: "#3AA6FF"
       }[a || ""] || "#C9F24B";
       d.setAttribute("data-studio-accent", a || "lime");
       d.style.setProperty("--studio-accent", hex);
     }
   } catch (e) {}
 })();`,
   }}
 />
 <AtmosphereProvider>
 <ScrollProgress />
 <NoiseTexture />
 <StudioParticles />
 <DynamicCursor />
 <Preloader />
 {/* Structured data: the studio, machine-readable. Organisation + site. */}
 <script
   type="application/ld+json"
   dangerouslySetInnerHTML={{
     __html: JSON.stringify({
       "@context": "https://schema.org",
       "@type": "Organization",
       name: "Greene Studios",
       url: process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app",
       logo: "/logo.png",
       email: "hello@greenestudios.co",
       description:
         "Independent digital design studio. Brands, websites, and digital products that make people stop scrolling.",
       foundingDate: "2022",
       sameAs: [
         "https://instagram.com/greenestudios",
         "https://twitter.com/greenestudios",
         "https://linkedin.com/company/greenestudios",
         "https://github.com/greenestudios",
       ],
       knowsAbout: [
         "Web Design",
         "UI/UX Design",
         "Branding",
         "Frontend Development",
         "Motion Design",
       ],
     }),
   }}
 />
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
 <FocusMode />
 </AtmosphereProvider>
 </body>
 </html>
 );
}
