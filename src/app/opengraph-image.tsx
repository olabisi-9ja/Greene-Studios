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
          backgroundColor: '#0F1113', // Midnight bg color
          padding: '80px',
        }}
      >
        {/* Monogram SVG Logo */}
        <div style={{ display: 'flex', marginBottom: '40px', width: '200px', height: '200px' }}>
          <svg
            viewBox="0 0 100 100"
            style={{
              width: '100%',
              height: '100%',
            }}
            fill="none"
            stroke="#1F3D3A" // Primary Emerald Accent
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* G */}
            <path d="M 55 25 C 40 10, 15 20, 15 50 C 15 80, 40 90, 55 75 C 65 65, 60 50, 45 50" />
            {/* S */}
            <path d="M 45 50 L 50 50 C 65 50, 85 45, 85 65 C 85 85, 65 90, 55 80 C 45 70, 50 50, 65 45 C 80 40, 80 20, 65 15 C 55 10, 45 15, 40 25" />
          </svg>
        </div>

        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            color: '#FAFAFA', 
            fontSize: 80, 
            fontWeight: 900, 
            lineHeight: 1.1, 
            letterSpacing: '-0.02em' 
          }}
        >
          <span>Greene Studios</span>
          <span style={{ fontSize: 24, color: '#A0A0A0', marginTop: '16px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Digital Design & Development Agency
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
