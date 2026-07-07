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
          stroke="white"
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
    ),
    {
      ...size,
    }
  );
}
