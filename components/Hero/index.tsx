import { SITE_NAME, SITE_DESCRIPTION } from '@/constants';
import styles from './index.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{SITE_NAME}</h1>
      <p className={styles.description}>{SITE_DESCRIPTION}</p>
    </section>
  );
}
