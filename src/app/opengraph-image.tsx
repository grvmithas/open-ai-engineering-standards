import { ImageResponse } from 'next/og';
import { PRODUCT_NAME, PRODUCT_SHORT, PRODUCT_TAGLINE } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${PRODUCT_SHORT} — ${PRODUCT_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(145deg, #0b1220 0%, #111827 55%, #1e3a8a 100%)',
          color: '#f8fafc',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, fontWeight: 700 }}>
          <span style={{ fontSize: 40 }}>⚡</span>
          <span>{PRODUCT_SHORT}</span>
          <span
            style={{
              marginLeft: 12,
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid rgba(251, 191, 36, 0.5)',
              background: 'rgba(251, 191, 36, 0.12)',
              color: '#fcd34d',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            v1.0 corpus
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 980 }}>
            {PRODUCT_NAME}
          </div>
          <div style={{ fontSize: 28, color: '#cbd5e1', maxWidth: 920, lineHeight: 1.35 }}>
            {PRODUCT_TAGLINE}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 22, color: '#93c5fd' }}>
          <span>AIDLC</span>
          <span>·</span>
          <span>Prompts</span>
          <span>·</span>
          <span>Agents</span>
          <span>·</span>
          <span>MCP</span>
          <span>·</span>
          <span>Evals</span>
          <span>·</span>
          <span>LLMOps</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
