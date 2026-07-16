'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TypedTitle.module.css';

type Props = {
  lines: string[];
  className?: string;
};

type Mode = 'idle' | 'anim' | 'edit';

// ターミナル風の見出し。
// - ホバー: 末尾からバックスペースで消え、タイプし直されて必ず戻る
// - クリック: 消えたあと入力モードになり、訪問者が自由に打てる(IME対応)。
//   Enter/フォーカスアウトで訪問者の文字を消し、元のコピーを打ち直す。
//   入力内容はこのブラウザ内だけで、どこにも保存されない。
export default function TypedTitle({ lines, className }: Props) {
  const total = lines.join('').length;
  const [visibleCount, setVisibleCount] = useState(total);
  const [mode, setMode] = useState<Mode>('idle');
  const [typing, setTyping] = useState(false);
  // 編集終了後に「訪問者の文字を消す」アニメ用。nullなら通常のlines表示
  const [customText, setCustomText] = useState<string | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const editRef = useRef<HTMLSpanElement>(null);

  const ERASE_MS = 45;
  const TYPE_MS = 70;
  const PAUSE_MS = 400;

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (mode === 'edit') editRef.current?.focus();
  }, [mode]);

  const schedule = (fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  };

  const reducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // count文字からゼロまで消すタイマーを張る。終わったらonDone
  const erase = (count: number, onDone: (elapsed: number) => void) => {
    for (let i = 1; i <= count; i++) {
      schedule(() => setVisibleCount(count - i), ERASE_MS * i);
    }
    onDone(ERASE_MS * count);
  };

  // 元のコピーを打ち直して idle に戻す
  const retype = (startDelay: number) => {
    schedule(() => setCustomText(null), startDelay);
    for (let i = 1; i <= total; i++) {
      schedule(() => setVisibleCount(i), startDelay + TYPE_MS * i);
    }
    schedule(() => {
      setTyping(false);
      setMode('idle');
    }, startDelay + TYPE_MS * total + 100);
  };

  // ホバー: 消して打ち直す一往復
  const replay = () => {
    if (mode !== 'idle') return;
    if (reducedMotion()) return;
    setMode('anim');
    setTyping(true);
    erase(total, (elapsed) => retype(elapsed + PAUSE_MS));
  };

  // クリック: 消してから入力モードへ
  const enterEdit = () => {
    if (mode === 'edit') return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (reducedMotion()) {
      setVisibleCount(0);
      setMode('edit');
      return;
    }
    setMode('anim');
    setTyping(true);
    // ホバー演出の途中でも、いま見えている文字数から消し始める
    erase(visibleCount, (elapsed) => {
      schedule(() => {
        setTyping(false);
        setMode('edit');
      }, elapsed + 80);
    });
  };

  // 入力終了: 訪問者の文字を消して元のコピーへ
  const finishEdit = () => {
    if (mode !== 'edit') return;
    const text = (editRef.current?.textContent ?? '').trim().slice(0, 60);
    setMode('anim');
    setTyping(true);
    if (text.length === 0 || reducedMotion()) {
      setCustomText(null);
      if (reducedMotion()) {
        setVisibleCount(total);
        setTyping(false);
        setMode('idle');
        return;
      }
      setVisibleCount(0);
      retype(PAUSE_MS);
      return;
    }
    setCustomText(text);
    setVisibleCount(text.length);
    schedule(() => {
      erase(text.length, (elapsed) => retype(elapsed + PAUSE_MS));
    }, 350);
  };

  const displayLines = customText !== null ? [customText] : lines;
  let offset = 0;

  return (
    <h1
      className={`${className ?? ''} ${styles.title}`}
      aria-label={lines.join('')}
      onMouseEnter={mode === 'idle' ? replay : undefined}
      onClick={mode !== 'edit' ? enterEdit : undefined}
    >
      {mode === 'edit' ? (
        <span
          ref={editRef}
          className={styles.editable}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label="見出しに自由に入力できます(保存はされません)"
          onBlur={finishEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              e.preventDefault();
              editRef.current?.blur();
            }
          }}
        />
      ) : (
        displayLines.map((line, lineIndex) => {
          const start = offset;
          offset += line.length;
          const end = offset;
          const cursorHere =
            visibleCount <= 0
              ? lineIndex === 0
              : visibleCount > start && visibleCount <= end;
          const cursorPos = Math.max(0, Math.min(visibleCount - start, line.length));
          const cursor = (
            <span className={`${styles.cursor} ${typing ? styles.cursorSolid : ''}`} />
          );
          return (
            <span
              className={`${styles.line} ${customText !== null ? styles.lineSoft : ''}`}
              key={lineIndex}
              aria-hidden="true"
            >
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
        })
      )}
    </h1>
  );
}
