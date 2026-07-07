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
          backgroundColor: '#FAFAFA',
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            color: '#1E342F', 
            fontSize: 180, 
            fontWeight: 900, 
            lineHeight: 0.85, 
            letterSpacing: '-0.02em' 
          }}
        >
          <span>Greene</span>
          <span style={{ color: '#101010' }}>Studios</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
