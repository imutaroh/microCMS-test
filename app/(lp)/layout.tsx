import Link from 'next/link';
import { SITE_NAME } from '@/constants';
import FluidCursor from '@/components/FluidCursor';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
};

export default function LpLayout({ children }: Props) {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          {SITE_NAME}
        </Link>
        <nav className={styles.nav}>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
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
      <main>{children}</main>
      <FluidCursor />
    </>
  );
}
