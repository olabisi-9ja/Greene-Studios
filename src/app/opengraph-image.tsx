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
            xmlns="http://www.w3.org/2000/svg"
          >
            <text 
              x="50%" 
              y="53%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              fontFamily="sans-serif" 
              fontSize="36" 
              fontWeight="500" 
              letterSpacing="1"
              fill="none"
              stroke="#1F3D3A"
              strokeWidth="1.5"
            >
              G-S
            </text>
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
