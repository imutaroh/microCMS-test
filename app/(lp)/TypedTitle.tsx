'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TypedTitle.module.css';

type Props = {
  lines: string[];
  className?: string;
};

// ホバーすると末尾からバックスペースで消え、タイプし直される見出し。
// 消えっぱなしだとメッセージが伝わらないので必ず一往復して戻る。
// カーソルは最後に見えている文字に追従し、打鍵中は点滅を止める。
export default function TypedTitle({ lines, className }: Props) {
  const total = lines.join('').length;
  const [visibleCount, setVisibleCount] = useState(total);
  const [typing, setTyping] = useState(false);
  const busyRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const schedule = (fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  };

  const replay = () => {
    if (busyRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    busyRef.current = true;
    setTyping(true);

    const eraseMs = 45;
    const typeMs = 70;
    const pauseMs = 400;

    // 消す(右から左へ)
    for (let i = 1; i <= total; i++) {
      schedule(() => setVisibleCount(total - i), eraseMs * i);
    }
    // 打ち直す(左から右へ)
    const typeStart = eraseMs * total + pauseMs;
    for (let i = 1; i <= total; i++) {
      schedule(() => setVisibleCount(i), typeStart + typeMs * i);
    }
    schedule(() => {
      setTyping(false);
      busyRef.current = false;
    }, typeStart + typeMs * total + 100);
  };

  // 各行の開始オフセット(カーソル位置の判定に使う)
  let offset = 0;

  return (
    <h1
      className={`${className ?? ''} ${styles.title}`}
      aria-label={lines.join('')}
      onMouseEnter={replay}
      onClick={replay}
    >
      {lines.map((line, lineIndex) => {
        const start = offset;
        offset += line.length;
        const end = offset;
        // カーソルは「最後に見えている文字」の行に置く。全消し中は先頭行。
        const cursorHere =
          visibleCount <= 0
            ? lineIndex === 0
            : visibleCount > start && visibleCount <= end;
        // 行内でのカーソル挿入位置(この文字数ぶん表示した直後に置く)
        const cursorPos = Math.max(0, Math.min(visibleCount - start, line.length));
        const cursor = (
          <span className={`${styles.cursor} ${typing ? styles.cursorSolid : ''}`} />
        );
        return (
          <span className={styles.line} key={lineIndex} aria-hidden="true">
            {cursorHere && cursorPos === 0 && cursor}
            {Array.from(line).map((ch, i) => (
              <span key={i}>
                <span
                  className={start + i < visibleCount ? styles.char : styles.charHidden}
                >
                  {ch}
                </span>
                {cursorHere && cursorPos === i + 1 && cursor}
              </span>
            ))}
          </span>
        );
      })}
    </h1>
  );
}
