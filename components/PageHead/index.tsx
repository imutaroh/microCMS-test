import styles from './index.module.css';

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
};

export default function PageHead({ eyebrow, title, lead }: Props) {
  return (
    <div className={styles.head}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
