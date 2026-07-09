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
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Letter G */}
            <path d="M 45 35 A 25 25 0 1 0 45 65 L 45 50 L 25 50 L 25 59 L 37 59 A 15 15 0 1 0 37 41 Z" />
            {/* Hyphen - */}
            <path d="M 47 45 L 57 45 L 57 55 L 47 55 Z" />
            {/* Letter S */}
            <path d="M 94 30 C 90 22, 82 20, 74 20 C 66 20, 60 26, 60 36 L 60 42 L 88 52 C 90 54, 94 60, 94 70 C 94 78, 86 80, 78 80 C 70 80, 64 76, 60 70 L 66 64 C 70 72, 76 74, 82 74 C 88 74, 88 70, 88 58 L 66 48 L 66 36 C 66 28, 74 26, 80 26 C 86 26, 88 28, 88 34 Z" />
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
