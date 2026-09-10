import type { Metadata } from "next";
import "./globals.css";

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
 icon: "/brand/gs-chip.svg",
 shortcut: "/brand/gs-chip.svg",
 apple: "/brand/gs-chip.png",
 },
};


/**
 * Root layout — html/body and metadata only.
 *
 * The Greene chrome (nav, footer, cursor, smooth scroll, preloader) lives in
 * the (greene) route group so the concept sites under /demo can render with
 * none of it. A demo that inherited Greene's navigation would stop being a
 * separate brand the moment a visitor looked at the top of the page.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
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
     if (m === "paper" || m === "day") m = "light";
     else if (m === "midnight" || m === "night" || m === "studio" || m === "raw") m = "dark";
     if (m !== "auto" && m !== "light" && m !== "dark") m = "auto";
     if (m === "auto") {
       m = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
     }
     var d = document.documentElement;
     d.classList.add("mode-" + m);
     d.setAttribute("data-mode", m);
   } catch (e) {}
 })();`,
   }}
 />
 {children}
 </body>
 </html>
 );
}
