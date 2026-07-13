import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// ホーム画面用: ミニダイヤルの大判(白×青)。角丸はOS側で付くので付けない
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafbfc',
        }}
      >
        <div
          style={{
            width: 104,
            height: 104,
            borderRadius: '50%',
            border: '10px solid #2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#3b82f6',
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
