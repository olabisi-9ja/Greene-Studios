import type { Metadata } from "next";
import { onyx } from "@/lib/brands";
import { fontPreloads } from "@/lib/brands/css";

export const metadata: Metadata = {
  title: { absolute: `${onyx.name} — ${onyx.tagline}`, template: `%s · ${onyx.name}` },
  description: onyx.direction,
  robots: { index: false, follow: true },
};

export default function OnyxLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {fontPreloads(onyx).map((href) => (
        <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
      ))}
      {children}
    </>
  );
}
