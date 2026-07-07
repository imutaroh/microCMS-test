import styles from './HeroBackground.module.css';

// profile.json カードの背後を中心にした同心円の計器盤モチーフ。
// SVG は 2000x1000px 固定(viewBox の2倍)でヒーロー中央に置くため、
// 画面幅に依らず 1px = 0.5 viewBox 単位で座標が決まる。
// カード中心: コンテナ(1200px)中央から +426px → vb では 500 + 213。
// カードがリング中心を覆うため、最小半径はカードの対角(約200px)より大きく取る。
const CENTER = { x: 713, y: 250 } as const;

const RINGS = [
  { r: 126, dashed: false },
  { r: 161, dashed: false },
  { r: 207, dashed: true },
  { r: 265, dashed: false },
  { r: 339, dashed: false },
] as const;

// r=161 のリングに沿った目盛り。30°ごとに長め、その間は短め。
const TICK_RING = 161;
const TICKS = Array.from({ length: 60 }, (_, i) => {
  const angle = (i * 6 * Math.PI) / 180;
  const major = i % 5 === 0;
  const inner = TICK_RING;
  const outer = TICK_RING + (major ? 6 : 3);
  return {
    id: `tick-${i}`,
    x1: CENTER.x + inner * Math.cos(angle),
    y1: CENTER.y + inner * Math.sin(angle),
    x2: CENTER.x + outer * Math.cos(angle),
    y2: CENTER.y + outer * Math.sin(angle),
    major,
  };
});

// 30°ごとの放射スポーク。内側のリングからカード外周を通り最外周まで。
// 150°/180°/210°は見出しテキストの帯を横切るため描かない。
const SPOKE_ANGLES = [0, 30, 60, 90, 120, 240, 270, 300, 330];
const SPOKES = SPOKE_ANGLES.map((deg) => {
  const angle = (deg * Math.PI) / 180;
  const inner = 126;
  const outer = 339;
  return {
    id: `spoke-${deg}`,
    x1: CENTER.x + inner * Math.cos(angle),
    y1: CENTER.y + inner * Math.sin(angle),
    x2: CENTER.x + outer * Math.cos(angle),
    y2: CENTER.y + outer * Math.sin(angle),
  };
});

// リングの上を周回するアクセント。円周(2πr)に対する弧の長さを dasharray で決め、
// dashoffset のアニメーションで軌道運動に見せる。
const ORBITS = [
  { r: 126, dash: '140 652', className: styles.orbitSlow },
  { r: 265, dash: '240 1425', className: styles.orbitSlower },
  { r: 207, dash: '3 1298', className: styles.comet },
] as const;

export default function HeroBackground() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.wash} />
      <svg className={styles.svg} viewBox="0 0 1000 500" role="presentation">
        <g>
          {RINGS.map((ring) => (
            <circle
              key={`ring-${ring.r}`}
              className={ring.dashed ? styles.ringDashed : styles.ring}
              cx={CENTER.x}
              cy={CENTER.y}
              r={ring.r}
            />
          ))}
        </g>
        <g>
          {SPOKES.map((spoke) => (
            <line
              key={spoke.id}
              className={styles.spoke}
              x1={spoke.x1}
              y1={spoke.y1}
              x2={spoke.x2}
              y2={spoke.y2}
            />
          ))}
        </g>
        <g>
          {TICKS.map((tick) => (
            <line
              key={tick.id}
              className={tick.major ? styles.tickMajor : styles.tick}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
            />
          ))}
        </g>
        <g>
          {ORBITS.map((orbit) => (
            <circle
              key={`orbit-${orbit.r}`}
              className={`${styles.orbit} ${orbit.className}`}
              cx={CENTER.x}
              cy={CENTER.y}
              r={orbit.r}
              strokeDasharray={orbit.dash}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
