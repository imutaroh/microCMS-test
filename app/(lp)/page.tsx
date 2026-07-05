import Link from 'next/link';
import { getList } from '@/libs/microcms';
import PublishedDate from '@/components/Date';
import TagList from '@/components/TagList';
import styles from './page.module.css';

const LATEST_ARTICLES_LIMIT = 3;

const LOG_ENTRIES = [
  { hash: 'e7a2f19', date: '2026-07', text: 'microCMS + Next.js でこのブログを公開' },
  { hash: 'c41b8d3', date: '2026-06', text: 'Goでバックエンド学習を開始' },
  { hash: 'a09c5e2', date: '2026-04', text: '新卒エンジニアとして入社' },
  { hash: '1f0d7b4', date: '2026-03', text: '大学卒業' },
];

const STACK_ENTRIES = [
  { name: 'Go', status: 'learning' },
  { name: 'TypeScript', status: 'daily' },
  { name: 'Next.js', status: 'daily' },
  { name: 'microCMS', status: 'new!' },
  { name: 'Claude Code', status: 'daily' },
];

export default async function Page() {
  const data = await getList({
    limit: LATEST_ARTICLES_LIMIT,
  });

  return (
    <>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>imuta — backend engineer</p>
        <h1 className={styles.heroTitle}>作って、つまずいて、記録する。</h1>
        <p className={styles.heroLead}>
          2026年新卒のバックエンドエンジニア。Goを学びながら、日々の学びと失敗をこのサイトに記録しています。
        </p>
        <div className={styles.heroCta}>
          <Link href="/blog" className={styles.ctaPrimary}>
            ブログを読む →
          </Link>
          <a
            href="https://github.com/imutaroh"
            className={styles.ctaSecondary}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub →
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.aboutBody}>
            <p>
              普段はバックエンドを中心に、AIを活用した開発ワークフローの模索をしながら手を動かしています。
              Claude Codeのようなエージェント型のツールをどう日々の開発に組み込むかを試行錯誤するのが好きです。
            </p>
            <p>
              学んだことをそのままにせず記録して公開するのは、後から自分で見返せるようにするためと、
              同じところでつまずいている誰かの役に立てばという理由からです。
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Learning Log <span className={styles.sectionSubtitle}>学習の記録</span>
        </h2>
        <ol className={styles.log}>
          {LOG_ENTRIES.map((entry) => (
            <li className={styles.logEntry} key={entry.hash}>
              <span className={styles.logDot} aria-hidden="true" />
              <span className={styles.logHash}>{entry.hash}</span>
              <span className={styles.logDate}>{entry.date}</span>
              <span className={styles.logText}>{entry.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Stack</h2>
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
        <h2 className={styles.sectionTitle}>最新の記事</h2>
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
          すべての記事 →
        </Link>
      </section>
    </>
  );
}
