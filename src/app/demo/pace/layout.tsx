import type { Metadata } from "next";
import { pace } from "@/lib/brands";
import { fontPreloads } from "@/lib/brands/css";

export const metadata: Metadata = {
  title: { absolute: `${pace.name} - ${pace.tagline}`, template: `%s · ${pace.name}` },
  description: pace.direction,
  robots: { index: false, follow: true },
};

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {fontPreloads(pace).map((href) => (
        <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
      ))}
      {children}
    </>
  );
}
