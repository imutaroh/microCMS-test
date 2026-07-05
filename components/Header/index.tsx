import Link from 'next/link';
import { SITE_NAME } from '@/constants';
import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <span className={styles.logoText}>{SITE_NAME}</span>
      </Link>
    </header>
  );
}
