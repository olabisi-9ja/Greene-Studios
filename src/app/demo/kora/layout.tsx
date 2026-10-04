import type { Metadata } from "next";
import { kora } from "@/lib/brands";
import { fontPreloads } from "@/lib/brands/css";

export const metadata: Metadata = {
  title: { absolute: `${kora.name} - ${kora.tagline}`, template: `%s · ${kora.name}` },
  description: kora.direction,
  robots: { index: false, follow: true },
};

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {fontPreloads(kora).map((href) => (
        <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
      ))}
      {children}
    </>
  );
}
