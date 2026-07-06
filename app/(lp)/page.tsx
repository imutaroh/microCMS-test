import Link from 'next/link';
import { getList } from '@/libs/microcms';
import PublishedDate from '@/components/Date';
import TagList from '@/components/TagList';
import LearningLog from './LearningLog';
import styles from './page.module.css';

const LATEST_ARTICLES_LIMIT = 3;

const LOG_ENTRIES = [
  { hash: 'e7a2f19', date: '2026-07', text: 'このブログを公開' },
  { hash: 'c41b8d3', date: '2026-06', text: 'Goの学習を開始' },
  { hash: 'a09c5e2', date: '2026-04', text: '新卒データエンジニアとして入社' },
  { hash: '1f0d7b4', date: '2026-03', text: '大学卒業' },
];

const STACK_ENTRIES = [
  { name: 'SQL', status: 'daily' },
  { name: 'Go', status: 'learning' },
  { name: 'Claude Code', status: 'daily' },
];

const PROFILE_FIELDS = [
  { key: 'name', value: 'imuta' },
  { key: 'role', value: 'Data Engineer' },
  { key: 'grade', value: '2026年卒' },
  { key: 'base', value: '福岡' },
  { key: 'focus', value: 'data platform / AI' },
];

const CONTACT_LINKS = [
  { label: 'GitHub', href: 'https://github.com/imutaroh', external: true },
  // TODO: X(旧Twitter)アカウント開設後に差し替える
  { label: 'X', href: 'https://x.com/', external: true },
  { label: 'Email', href: 'mailto:contact@example.com', external: false },
];

export default async function Page() {
  const data = await getList({
    limit: LATEST_ARTICLES_LIMIT,
  });

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroMain}>
          <p className={`${styles.eyebrow} ${styles.heroItem1}`}>imuta — data engineer</p>
          <h1 className={`${styles.heroTitle} ${styles.heroItem2}`}>
            周りの価値を、最大化するエンジニアへ。
          </h1>
          <p className={`${styles.heroLead} ${styles.heroItem3}`}>
            2026年新卒のデータエンジニア。まだ道の途中だからこそ、データ基盤とAI活用に向き合いながら、日々の学びをここに記録しています。
          </p>
          <div className={`${styles.heroCta} ${styles.heroItem4}`}>
            <Link href="/blog" className={styles.ctaPrimary}>
              ブログを読む
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <a
              href="https://github.com/imutaroh"
              className={styles.ctaSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        <div className={`${styles.heroCard} ${styles.heroItem5}`} aria-hidden="true">
          <div className={styles.cardTab}>
            <span className={styles.cardDot} />
            profile.json
          </div>
          <dl className={styles.cardBody}>
            {PROFILE_FIELDS.map((field) => (
              <div className={styles.cardRow} key={field.key}>
                <dt className={styles.cardKey}>{field.key}</dt>
                <dd className={styles.cardValue}>{field.value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.cardFooter}>github.com/imutaroh</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>01 / about</p>
          <h2 className={styles.sectionTitle}>About</h2>
        </div>
        <div className={styles.aboutBody}>
          <p>
            福岡で、D2Cのデータ基盤を作って活用しながらAIを推進していくチームで働いています。
            Claude Codeのようなエージェント型のツールをどう日々の業務に組み込むかを試行錯誤するのが好きです。
          </p>
          <p>
            学んだことをそのままにせず記録して公開するのは、後から自分で見返せるようにするためと、
            同じところでつまずいている誰かの役に立てばという理由からです。
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>02 / log</p>
          <h2 className={styles.sectionTitle}>Learning Log</h2>
        </div>
        <LearningLog entries={LOG_ENTRIES} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>03 / stack</p>
          <h2 className={styles.sectionTitle}>Stack</h2>
        </div>
        <ul className={styles.stack}>
          {STACK_ENTRIES.map((item) => (
            <li className={styles.stackRow} key={item.name}>
              <span className={styles.stackName}>{item.name}</span>
              <span className={styles.stackStatus}>{item.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>04 / articles</p>
          <h2 className={styles.sectionTitle}>最新の記事</h2>
        </div>
        <ul className={styles.articles}>
          {data.contents.map((article) => (
            <li className={styles.articleRow} key={article.id}>
              <Link href={`/articles/${article.id}`} className={styles.articleLink}>
                <span className={styles.articleTitle}>{article.title}</span>
                <span className={styles.articleMeta}>
                  <PublishedDate date={article.publishedAt || article.createdAt} />
                  <TagList tags={article.tags} hasLink={false} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/blog" className={styles.articlesMore}>
          すべての記事
          <span className={styles.ctaArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>05 / contact</p>
          <h2 className={styles.sectionTitle}>Contact</h2>
        </div>
        <ul className={styles.contact}>
          {CONTACT_LINKS.map((link) => (
            <li className={styles.contactRow} key={link.label}>
              <a
                href={link.href}
                className={styles.contactLink}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={styles.contactLabel}>{link.label}</span>
                <span className={styles.contactValue}>{link.href.replace(/^mailto:/, '')}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
