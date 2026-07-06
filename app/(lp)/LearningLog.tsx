'use client';

import { useEffect, useRef } from 'react';
import styles from './page.module.css';

type Entry = {
  hash: string;
  date: string;
  text: string;
};

type Props = {
  entries: Entry[];
};

export default function LearningLog({ entries }: Props) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll(`.${styles.logEntry}`);
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((observedEntry) => {
          if (observedEntry.isIntersecting) {
            observedEntry.target.classList.add(styles.logEntryVisible);
            observer.unobserve(observedEntry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -40px 0px' },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <ol className={styles.log} ref={listRef}>
      {entries.map((entry, index) => (
        <li
          className={styles.logEntry}
          key={entry.hash}
          style={{ transitionDelay: `${index * 90}ms` }}
        >
          <span className={styles.logDot} aria-hidden="true" />
          <span className={styles.logHash}>{entry.hash}</span>
          <span className={styles.logDate}>{entry.date}</span>
          <span className={styles.logText}>{entry.text}</span>
        </li>
      ))}
    </ol>
  );
}
