import styles from './PipelineBackground.module.css';

// データ基盤の DAG(複数ソース → 集約 → 分岐)を模した座標。
// 左寄りのノードほどヒーロー文言の裏に来るため、x を右寄りに寄せて可読性を優先する。
const NODES = [
  { id: 'a1', cx: 330, cy: 90, r: 3.5, pulse: null },
  { id: 'a2', cx: 310, cy: 230, r: 4, pulse: 1 },
  { id: 'a3', cx: 335, cy: 390, r: 3.5, pulse: null },
  { id: 'b1', cx: 570, cy: 160, r: 4, pulse: 2 },
  { id: 'b2', cx: 590, cy: 320, r: 3.5, pulse: null },
  { id: 'c1', cx: 830, cy: 80, r: 3.5, pulse: null },
  { id: 'c2', cx: 855, cy: 230, r: 4, pulse: 3 },
  { id: 'c3', cx: 825, cy: 400, r: 3.5, pulse: null },
] as const;

const EDGES = [
  { id: 'a1-b1', d: 'M330 90 C 430 100, 470 150, 570 160', flow: 'A' },
  { id: 'a2-b1', d: 'M310 230 C 400 200, 470 180, 570 160', flow: 'B' },
  { id: 'a2-b2', d: 'M310 230 C 400 260, 480 300, 590 320', flow: 'C' },
  { id: 'a3-b2', d: 'M335 390 C 430 380, 500 350, 590 320', flow: 'A' },
  { id: 'b1-c1', d: 'M570 160 C 680 130, 750 100, 830 80', flow: 'B' },
  { id: 'b1-c2', d: 'M570 160 C 680 180, 760 210, 855 230', flow: 'C' },
  { id: 'b2-c2', d: 'M590 320 C 690 290, 770 260, 855 230', flow: 'A' },
  { id: 'b2-c3', d: 'M590 320 C 680 350, 750 380, 825 400', flow: 'B' },
] as const;

const FLOW_CLASS: Record<string, string> = {
  A: styles.flowA,
  B: styles.flowB,
  C: styles.flowC,
};

const PULSE_CLASS: Record<number, string> = {
  1: styles.pulse1,
  2: styles.pulse2,
  3: styles.pulse3,
};

export default function PipelineBackground() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <g>
          {EDGES.map((edge) => (
            <path key={`${edge.id}-base`} className={styles.edgeBase} d={edge.d} />
          ))}
        </g>
        <g>
          {EDGES.map((edge) => (
            <path
              key={`${edge.id}-flow`}
              className={`${styles.edgeFlow} ${FLOW_CLASS[edge.flow]}`}
              d={edge.d}
            />
          ))}
        </g>
        <g>
          {NODES.map((node) => (
            <circle
              key={node.id}
              className={`${styles.node} ${node.pulse ? PULSE_CLASS[node.pulse] : ''}`}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
