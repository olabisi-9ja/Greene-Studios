import type { Metadata } from "next";
import { arc } from "@/lib/brands";
import { fontPreloads } from "@/lib/brands/css";

export const metadata: Metadata = {
  title: { absolute: `${arc.name} - ${arc.tagline}`, template: `%s · ${arc.name}` },
  description: arc.direction,
  robots: { index: false, follow: true },
};

export default function ArcLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {fontPreloads(arc).map((href) => (
        <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
      ))}
      {children}
    </>
  );
}
