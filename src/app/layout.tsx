import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Montserrat, self-hosted and preloaded: the Latin variable file (every
 * weight in one), with a fallback sized to match so nothing shifts when it
 * arrives. Rare Latin Extended letters fall back to the system font.
 */
const montserrat = localFont({
  src: [{ path: "../../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const viewport: import("next").Viewport = {
 width: "device-width",
 initialScale: 1,
};

export const metadata: Metadata = {
 metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app"),
  title: {
    default: "Greene Studios · Digital Design Studio",
 template: "%s | Greene Studios",
 },
 description:
 "Greene Studios is a digital design studio. We design and build brands, websites and apps, one team from the first sketch to launch day.",
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
 url: "/",
 siteName: "Greene Studios",
 title: "Greene Studios · Digital Design Studio",
 description:
 "Greene Studios is a digital design studio. We design and build brands, websites and apps, one team from the first sketch to launch day.",
 },
 twitter: {
 card: "summary_large_image",
 title: "Greene Studios · Digital Design Studio",
 description: "Greene Studios is a digital design studio. We design and build brands, websites and apps, one team from the first sketch to launch day.",
 },
 robots: {
 index: true,
 follow: true,
 },
};


/**
 * Root layout, html/body and metadata only.
 *
 * The Greene chrome (nav, footer, cursor, smooth scroll, preloader) lives in
 * the (greene) route group so the concept sites under /demo can render with
 * none of it. A demo that inherited Greene's navigation would stop being a
 * separate brand the moment a visitor looked at the top of the page.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
 <html lang="en" suppressHydrationWarning className={`${montserrat.variable} font-sans mode-studio`} data-mode="studio">
 <body className="antialiased overflow-x-hidden">
 {/* Apply the saved theme before hydration so there is no flash of the
     wrong one; the page is served in studio, the default. Plain inline <script> inside <body> (not next/script,
     which renders as a child of <html> and breaks hydration). */}
 <script
   dangerouslySetInnerHTML={{
     __html: `(function(){
   try {
     var m = localStorage.getItem("greene:atmosphere");
      if (m === "paper" || m === "day") m = "light";
      else if (m === "midnight" || m === "night") m = "dark";
      // first visit (nothing saved): the studio theme, for everyone
      if (m !== "auto" && m !== "light" && m !== "dark" && m !== "studio" && m !== "raw") m = "studio";
     if (m === "auto") {
       m = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
     }
     var d = document.documentElement;
     d.classList.remove("mode-studio");
     d.classList.add("mode-" + m);
     d.setAttribute("data-mode", m);
     if (sessionStorage.getItem("greene:loaded") === "1") d.classList.add("loader-seen");
   } catch (e) {}
 })();`,
   }}
 />
 {children}
 </body>
 </html>
 );
}
