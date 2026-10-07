import { ImageResponse } from "next/og";
import { RUNNER_D } from "@/components/brand/runnerPath";

export const runtime = "edge";

export const alt = "Greene Studios, Digital Design Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card, in the brand: Studio Green, the runner in Clover Yellow,
 * the wordmark in Montserrat SemiBold (woff, which the image renderer reads;
 * the site's own font files are woff2).
 */
export default async function Image() {
  const montserrat = await fetch(new URL("./Montserrat-SemiBold.woff", import.meta.url)).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0B3D26",
          backgroundImage: "radial-gradient(circle, rgba(255,210,63,0.16) 1.6px, transparent 2px)",
          backgroundSize: "22px 22px",
          color: "#FAFAF7",
          fontFamily: "Montserrat",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
          <svg width="150" height="155" viewBox="0 0 693 715">
            <path fill="#FFD23F" fillRule="evenodd" d={RUNNER_D} />
          </svg>
          <div style={{ display: "flex", color: "#FFD23F", fontSize: 112, letterSpacing: "-0.02em", lineHeight: 0.9 }}>Greene</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, letterSpacing: "-0.04em", lineHeight: 1.02, maxWidth: 900 }}>
            We design and build brands, websites and apps.
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, fontSize: 24, color: "rgba(250,250,247,0.7)" }}>
            <span>Greene Studios, Digital Design Studio</span>
            <span>greene-studios.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Montserrat", data: montserrat, style: "normal", weight: 600 }] },
  );
}
