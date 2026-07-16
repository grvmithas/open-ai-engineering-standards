import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b1220',
          color: '#60a5fa',
          fontSize: 220,
          fontWeight: 800,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        ⚡
      </div>
    ),
    { ...size },
  );
}
