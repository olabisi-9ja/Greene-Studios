import { AtmosphereProvider } from "@/lib/context/AtmosphereContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import NoiseTexture from "@/components/canvas/NoiseTexture";
import FocusMode from "@/components/FocusMode";
import ScrollProgress from "@/components/animations/ScrollProgress";
import FloatingButtons from "@/components/FloatingButtons";
import PageTransition from "@/components/animations/PageTransition";

/**
 * The Greene Studios site itself. Everything under /demo deliberately sits
 * outside this group and shares none of this chrome.
 */
export default function GreeneLayout({ children }: { children: React.ReactNode }) {
  return (
    <AtmosphereProvider>
      <ScrollProgress />
      <NoiseTexture />
      <Preloader />

      {/* Structured data: the studio, machine-readable. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Greene Studios",
            url: process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app",
            logo: "/brand/gs-chip.png",
            email: "hello@greenestudios.com",
            description:
              "Independent digital design studio. Brands, websites, and digital products that make people stop scrolling.",
            foundingDate: "2022",
            address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
            sameAs: [
              "https://instagram.com/greenestudios",
              "https://twitter.com/greenestudios",
              "https://linkedin.com/company/greenestudios",
              "https://github.com/greenestudios",
            ],
            knowsAbout: ["Web Design", "UI/UX Design", "Branding", "Frontend Development", "Motion Design"],
          }),
        }}
      />

      <SmoothScroll>
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingButtons />
      </SmoothScroll>
      <FocusMode />
    </AtmosphereProvider>
  );
}
