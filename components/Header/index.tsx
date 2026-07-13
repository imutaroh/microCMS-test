import Link from 'next/link';
import { SITE_NAME } from '@/constants';
import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        {SITE_NAME}
      </Link>
      <nav className={styles.nav}>
        <Link href="/blog" className={styles.navLink}>
          Blog
        </Link>
        <a
          href="https://zenn.dev/imutaroh"
          className={styles.navLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Zenn
        </a>
        <a
          href="https://note.com/imutaroh"
          className={styles.navLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          note
        </a>
        <a
          href="https://github.com/imutaroh"
          className={styles.navLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
