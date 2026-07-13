import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.code}>404 — not found</p>
      <p className={styles.text}>お探しのページは見つかりませんでした。</p>
      <Link href="/" className={styles.home}>
        トップへ戻る <span className={styles.arrow}>→</span>
      </Link>
    </div>
  );
}
