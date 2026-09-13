import type { Metadata } from "next";
import { vera } from "@/lib/brands";
import { fontPreloads } from "@/lib/brands/css";

export const metadata: Metadata = {
  title: { absolute: `${vera.name} - ${vera.tagline}`, template: `%s · ${vera.name}` },
  description: vera.direction,
  robots: { index: false, follow: true },
};

export default function VeraLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {fontPreloads(vera).map((href) => (
        <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
      ))}
      {children}
    </>
  );
}
