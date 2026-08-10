import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Greene Studios';
export const size = {
 width: 1200,
 height: 630,
};

export const contentType = 'image/png';

/**
 * The share card IS the brand system: Deep Greene field, the fused GS
 * monogram as real vector paths (same geometry as /brand/gs-monogram.svg),
 * and the wordmark set in the brand typeface (Geist Bold).
 */
export default async function Image() {
  const geist = await fetch(new URL('./Geist-Bold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#263B38',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Geist',
        }}
      >
        {/* depth within the palette: paper halo + black vignette */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            right: -180,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(245,244,239,0.07), rgba(245,244,239,0))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -260,
            left: -220,
            width: 680,
            height: 680,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(10,10,10,0.35), rgba(10,10,10,0))',
          }}
        />

        {/* the GS mark — identical paths to /brand/gs-monogram.svg */}
        <svg width="196" height="193" viewBox="0 0 1161.9 1143.8">
          <g transform="translate(58.0 826.0) scale(1 -1)"><path d="M370 -16Q267 -16 194.0 31.0Q121 78 81.5 161.5Q42 245 42 354Q42 461 82.0 545.0Q122 629 197.5 677.5Q273 726 379 726Q517 726 591.5 658.0Q666 590 689 477L532 470Q521 529 485.5 563.5Q450 598 380 598Q319 598 278.5 566.0Q238 534 218.5 479.0Q199 424 199 354Q199 283 218.5 228.5Q238 174 278.5 143.0Q319 112 383 112Q453 112 495.0 153.0Q537 194 542 258H380V369H691V0H597L592 101Q564 48 504.5 16.0Q445 -16 370 -16Z" fill="#F5F4EF"/></g><g transform="translate(58.0 826.0) scale(1 -1) translate(351.5 -201.2) scale(1.0371428571428571 1.0371428571428571)"><path d="M355 -16Q217 -16 138.5 52.0Q60 120 52 234L205 241Q214 178 251.0 144.0Q288 110 357 110Q413 110 444.5 130.5Q476 151 476 192Q476 217 464.0 235.5Q452 254 418.0 269.5Q384 285 318 300Q227 321 171.5 347.0Q116 373 91.0 412.5Q66 452 66 512Q66 575 97.5 623.5Q129 672 189.0 699.0Q249 726 332 726Q420 726 481.0 695.0Q542 664 576.0 610.0Q610 556 618 486L466 478Q460 533 425.5 566.5Q391 600 330 600Q278 600 248.5 577.0Q219 554 219 517Q219 491 232.0 473.5Q245 456 277.0 443.0Q309 430 367 418Q466 398 523.0 367.5Q580 337 604.5 295.0Q629 253 629 199Q629 133 595.5 84.5Q562 36 500.5 10.0Q439 -16 355 -16Z" fill="#F5F4EF"/></g>
        </svg>

        <div
          style={{
            marginTop: 44,
            display: 'flex',
            color: '#F5F4EF',
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          Greene Studios
        </div>
        <div
          style={{
            marginTop: 26,
            display: 'flex',
            color: 'rgba(245,244,239,0.55)',
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
          }}
        >
          Independent Digital Design Studio
        </div>

        {/* bottom strip */}
        <div
          style={{
            position: 'absolute',
            left: 64,
            right: 64,
            bottom: 44,
            display: 'flex',
            justifyContent: 'space-between',
            color: 'rgba(245,244,239,0.45)',
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          <span>Design that can&apos;t be ignored</span>
          <span>greenestudios.co</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Geist', data: geist, style: 'normal', weight: 700 }],
    }
  );
}
