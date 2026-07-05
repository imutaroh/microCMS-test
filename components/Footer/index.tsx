import { SITE_NAME } from '@/constants';
import styles from './index.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.cr}>© {SITE_NAME} 2026</p>
    </footer>
  );
}
