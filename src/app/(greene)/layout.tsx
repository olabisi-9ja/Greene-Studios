import { AtmosphereProvider } from "@/lib/context/AtmosphereContext";
import { CurrencyProvider } from "@/lib/context/CurrencyContext";
import TopBar from "@/components/chrome/TopBar";
import DockNav from "@/components/chrome/DockNav";
import Loader from "@/components/chrome/Loader";
import SiteTour from "@/components/chrome/SiteTour";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseTexture from "@/components/canvas/NoiseTexture";
import ScrollProgress from "@/components/animations/ScrollProgress";
import PageTransition from "@/components/animations/PageTransition";

export default function GreeneLayout({ children }: { children: React.ReactNode }) {
  return (
    <AtmosphereProvider>
      <CurrencyProvider>
      <ScrollProgress />
      <NoiseTexture />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Greene Studios",
            url: process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app",
            logo: "/brand/greene-logo.png",
            email: "hello@greenestudios.com",
            description:
              "Greene Studios is a digital design studio. We design and build brands, websites and apps, one team from the first sketch to launch day.",
            foundingDate: "2022",
            knowsAbout: ["Web Design", "UI/UX Design", "Branding", "Frontend Development", "Motion Design"],
          }),
        }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-[4px] focus:bg-[var(--brand-accent)] focus:px-4 focus:py-2 focus:text-[var(--brand-on-accent)]"
      >
        Skip to content
      </a>
      <Loader />
      <SmoothScroll>
        <TopBar />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </SmoothScroll>
      <DockNav />
      <SiteTour />
      </CurrencyProvider>
    </AtmosphereProvider>
  );
}
