/**
 * Claude Code が執筆した記事を microCMS に投稿するスクリプト。
 *
 * 使い方:
 *   npx tsx scripts/post-article.ts <記事JSONファイルパス>
 *
 * 記事JSONの形式:
 *   {
 *     "title": "記事タイトル",
 *     "description": "記事概要",
 *     "content": "<p>本文HTML</p>",
 *     "tagIds": ["参照先タグのコンテンツID", ...],
 *     "writerId": "参照先ライターのコンテンツID"
 *   }
 *
 * 環境変数:
 *   MICROCMS_SERVICE_DOMAIN, MICROCMS_MANAGEMENT_API_KEY (または MICROCMS_API_KEY) を
 *   process.env から読む。
 *   dotenv は使わないので、実行前に環境変数を設定するか
 *   `node --env-file=.env.local` 経由で読み込ませること。
 *
 * 注意:
 *   ここで使う APIキーには、管理画面で「書き込み」権限を
 *   付与したAPIキー(MICROCMS_MANAGEMENT_API_KEY)を指定する必要がある。
 *   読み取り専用キーでは POST が 403 になる。
 */
import { createClient } from "microcms-js-sdk";
import { readFileSync } from "node:fs";

type ArticleInput = {
  title: string;
  description: string;
  content: string;
  tagIds?: string[];
  writerId?: string;
};

function loadArticle(filePath: string): ArticleInput {
  const raw = readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as ArticleInput;

  if (!data.title || !data.description || !data.content) {
    throw new Error("記事JSONには title, description, content が必須です");
  }

  return data;
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error(
      "使い方: npx tsx scripts/post-article.ts <記事JSONファイルパス>",
    );
    process.exit(1);
  }

  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  // 書き込み用キーがあれば優先し、無ければ通常キーで試す
  const apiKey =
    process.env.MICROCMS_MANAGEMENT_API_KEY ?? process.env.MICROCMS_API_KEY;

  if (!serviceDomain) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is not set");
  }
  if (!apiKey) {
    throw new Error(
      "MICROCMS_MANAGEMENT_API_KEY または MICROCMS_API_KEY を設定してください",
    );
  }

  const client = createClient({ serviceDomain, apiKey });

  const article = loadArticle(filePath);

  const content: Record<string, unknown> = {
    title: article.title,
    description: article.description,
    content: article.content,
  };
  if (article.tagIds) {
    content.tags = article.tagIds;
  }
  if (article.writerId) {
    content.writer = article.writerId;
  }

  const result = await client.create({
    endpoint: "blog",
    content,
  });

  console.log(result.id);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
