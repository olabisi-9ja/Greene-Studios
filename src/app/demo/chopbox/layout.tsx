import type { Metadata } from "next";
import { chopbox } from "@/lib/brands";
import { fontPreloads } from "@/lib/brands/css";

export const metadata: Metadata = {
  title: { absolute: `${chopbox.name} - ${chopbox.tagline}`, template: `%s · ${chopbox.name}` },
  description: chopbox.direction,
  robots: { index: false, follow: true },
};

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {fontPreloads(chopbox).map((href) => (
        <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
      ))}
      {children}
    </>
  );
}
