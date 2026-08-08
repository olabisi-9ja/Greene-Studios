import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Greene Studios';
export const size = {
 width: 1200,
 height: 630,
};

export const contentType = 'image/png';

export default function Image() {
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
          backgroundColor: '#F5F4EF', // Warm White bg
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft green halo */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(31,61,58,0.18), rgba(31,61,58,0))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -200,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(201,242,75,0.16), rgba(201,242,75,0))',
          }}
        />

        {/* Monogram: ring + G + S rendered as styled divs (satori-safe, no SVG <text>) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 200,
            marginBottom: 48,
            borderRadius: 9999,
            border: '6px solid #1F3D3A',
          }}
        >
          <div style={{ display: 'flex', gap: 4, color: '#1F3D3A', fontSize: 76, fontWeight: 900, letterSpacing: -4 }}>
            <span>G</span>
            <span style={{ opacity: 0.85 }}>S</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#0B0D0C',
            fontSize: 80,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          <span>Greene Studios</span>
          <span
            style={{
              fontSize: 24,
              color: '#5D655F',
              marginTop: '16px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Independent Digital Design Studio
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
