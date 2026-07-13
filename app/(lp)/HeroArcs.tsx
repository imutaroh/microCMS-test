import styles from './HeroArcs.module.css';

// グレー地に大きな円弧が漂う静かな背景。
// 細い弧のライン上に、光る青いノードを2つ置く。
export default function HeroArcs() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.washLeft} />
      <div className={styles.washRight} />
      <div className={styles.dots} />
      <svg className={styles.svg} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice">
        {/* 大きな同心の弧(左下・右上) */}
        <circle className={styles.circle} cx="-80" cy="900" r="560" />
        <circle className={styles.circle} cx="-80" cy="900" r="700" />
        <circle className={styles.circle} cx="1520" cy="-140" r="620" />
        <circle className={styles.circle} cx="1520" cy="-140" r="780" />
        {/* 見出しの上を横切る大きな弧と、その軌道上の光るノード */}
        <path className={styles.arcLine} d="M 240 -80 A 780 780 0 0 1 980 700" />
        <g className={styles.node}>
          <circle cx="672" cy="118" r="10" className={styles.nodeGlow} />
          <circle cx="672" cy="118" r="4.5" className={styles.nodeCore} />
        </g>
        <g className={styles.node}>
          <circle cx="948" cy="600" r="10" className={styles.nodeGlow} />
          <circle cx="948" cy="600" r="4.5" className={styles.nodeCore} />
        </g>
      </svg>
    </div>
  );
}
