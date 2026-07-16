import Link from 'next/link';
import ClickSpark from '@/components/ClickSpark';
import BrandIcon from '@/components/BrandIcon';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
};

export default function LpLayout({ children }: Props) {
  return (
    <ClickSpark sparkColor="#0087a8" sparkSize={9} sparkRadius={16} sparkCount={8}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          imutaro<span className={styles.logoTld}>.com</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
          <a
            href="https://zenn.dev/imu_imu"
            className={styles.navIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zenn"
            title="Zenn"
          >
            <BrandIcon name="zenn" size={16} />
          </a>
          <a
            href="https://note.com/imutaroh"
            className={styles.navIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="note"
            title="note"
          >
            <BrandIcon name="note" size={16} />
          </a>
          <a
            href="https://x.com/imutaroh"
            className={styles.navIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            title="X"
          >
            <BrandIcon name="x" size={16} />
          </a>
          <a
            href="https://github.com/imutaroh"
            className={styles.navIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <BrandIcon name="github" size={16} />
          </a>
        </nav>
      </header>
      <main>{children}</main>
    </ClickSpark>
  );
}
