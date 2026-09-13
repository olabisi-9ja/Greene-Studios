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
import QuickActionsPanel from "@/components/ui/QuickActionsPanel";

export default function GreeneLayout({ children }: { children: React.ReactNode }) {
  return (
    <AtmosphereProvider>
      <ScrollProgress />
      <NoiseTexture />
      <Preloader />

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
        <QuickActionsPanel />
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
