'use client';

import { useEffect, useState } from 'react';
import SplashCursor from '../SplashCursor';

// SplashCursor をサイトの世界観に合わせて調整するラッパー。
// - 虹色は使わずアクセントのティール1色(墨流しのような淡い軌跡)
// - シェーディングを切ってフラットな見え方に寄せる
// - マウス環境のみ有効(タッチ端末では流体シミュレーションを起動しない)
// - prefers-reduced-motion を尊重する
export default function FluidCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  if (!enabled) return null;

  return (
    <SplashCursor
      RAINBOW_MODE={false}
      COLOR="#6fcde8"
      SHADING={false}
      SPLAT_RADIUS={0.1}
      SPLAT_FORCE={3800}
      DENSITY_DISSIPATION={6}
      VELOCITY_DISSIPATION={2.5}
      CURL={2}
    />
  );
}
