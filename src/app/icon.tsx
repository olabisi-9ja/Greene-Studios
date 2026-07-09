import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1F3D3A', // Core Greene Studios green
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          padding: '4px',
        }}
      >
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
            stroke="white"
            strokeWidth="1.5"
          >
            G-S
          </text>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
