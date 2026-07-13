# DESIGN.md — imutaro.com デザインシステム

トップページ（LP）で確立したデザイン言語の定義。**全ページはこのドキュメントに従う。**
新しいページ・コンポーネントを作るときは、ここにない装飾を発明する前にこの語彙で解決できないか確認する。

## 1. コンセプト

**「データエンジニアのフィールドノート」** — 計器・ログ・端末の語彙で、学びの記録を淡々と美しく見せる。

- 語り口は静か。装飾は情報を運ぶものだけ（罫線=区切り、mono=メタデータ、点=状態）
- 演出（DotGrid・SplitText・FluidCursor・ClickSpark）は **LP専用**。読むページ（ブログ/記事）には持ち込まない
- ブログ/記事ページに持ち込むのは **トーン**（色・書体・余白・罫線・モチーフ）だけ

## 2. カラートークン（globals.css 定義済み）

| トークン | 値 | 用途 |
|---|---|---|
| `--color-bg` | `#fafbfc` | ページ背景 |
| `--color-ink` | `#1a2330` | 見出し・本文の主文字色 |
| `--color-sub` | `#5b6572` | 補助テキスト・メタ情報 |
| `--color-accent` | `#0087a8` | リンクhover・アクセント・mono見出し |
| `--color-accent-bright` | `#00add8` | アクセントのhover強調・点滅 |
| `--color-line` | `#e3e8ed` | ヘアライン罫線・カード枠 |
| `--color-code-bg` | `#f0f3f6` | コード背景・hover背景・カードタブ |

原則:
- 面で塗らない。色は**線と文字**に使う。背景色は `--color-code-bg` の淡い面だけ
- アクセントは1ページに点在させすぎない。「今注目すべきもの」にだけ

## 3. タイポグラフィ

| 役割 | フォント | 変数 | 使い所 |
|---|---|---|---|
| Display | Space Grotesk | `--font-display` | h1〜h6（globals.cssで自動適用） |
| Body | Zen Kaku Gothic New | `--font-body` | 本文 |
| Mono | IBM Plex Mono | `--font-mono` | **メタデータ全般**: eyebrow・日付・タグ・ハッシュ・ラベル・パンくず |

原則:
- **mono = 機械が読む情報**（日付、タグ、ステータス、ID）。人間向けの文は body
- 見出しは `font-weight: 700`、本文リンクやリスト項目タイトルは `500`
- 日本語見出しは `word-break: keep-all` + `text-wrap: balance` を検討

## 4. モチーフ（このサイトの署名）

1. **ミニダイヤル**: 輪＋中心点 `◉`。セクション見出しの eyebrow に付く
   ```css
   /* .sectionEyebrow::before と同じ */
   width/height: 10px; border-radius: 50%;
   border: 1px solid var(--color-accent);
   background: radial-gradient(circle, var(--color-accent) 0 2px, transparent 2.5px);
   ```
2. **点とリング**: タイムラインのノード。`box-shadow: 0 0 0 3px var(--color-bg), 0 0 0 4px rgba(0,135,168,.35)`
3. **ヘアライン罫線リスト**: `border-bottom: 1px solid var(--color-line)` で区切った行。hoverで `background: var(--color-code-bg)` ＋タイトルが accent に
4. **code-tab カード**: 上部にmonoのタブ（`--color-code-bg`地・点付き）を持つ枠線カード（profile.json カード）
5. **mono ピル**: `border: 1px solid var(--color-line); border-radius: 999px; font-family: mono; font-size: .8rem`（タグ・ステータス用）

## 5. レイアウト・余白

- コンテンツ最大幅: LP=1040px（hero=1200px）、記事本文=720px
- セクション間: 96px（モバイル 64px）、見出しとコンテンツ間: 40px
- 角丸: `--border-radius`(4px)。カードのみ 8px
- 影は原則使わない。使うのは浮いているカードだけ（`0 24px 48px -32px rgba(26,35,48,.28)`）

## 6. セクション見出しの型

```
◉ 01 / about        ← eyebrow: mono 0.8rem, accent色, ミニダイヤル付き
About               ← title: 1.6rem / 700 / ink
```
番号は「ページ内の順序」を表すときだけ付ける。一覧ページ等では `/ blog` のようにラベルのみ。

## 7. インタラクション

- hover遷移は `0.15s ease`（色・背景）、変形は `0.2〜0.25s ease`
- 行リストのhover: 背景 `--color-code-bg`、タイトル `--color-accent`、矢印は `translateX(4px)`
- リンク矢印は `→` を span で持ち、hoverでスライド
- `prefers-reduced-motion: reduce` を必ず尊重（globals.cssで一括対応済み）
- focus-visible: `outline: 2px solid var(--color-accent)`（定義済み。塗りボタン上では ink に変える）

## 8. ページ別の適用方針

| ページ | 演出 | 構成 |
|---|---|---|
| `/`（LP） | フル（DotGrid, SplitText, ShinyText, ClickSpark, FluidCursor） | hero + セクション |
| `/blog`, `/tags/*`, `/search` | 演出なし | eyebrow付きページ見出し + ヘアライン行リスト + monoピルのタグ |
| `/articles/*` | 演出なし | mono メタ → 見出し → 本文720px。読みやすさ最優先 |
| 404 | なし | mono `404` + 一言 + 帰りのリンク |

## 9. アンチパターン

- ❌ アクセント色での面塗り（ボタン以外）
- ❌ 読むページへの動く背景・カーソル演出
- ❌ 影付きカードの多用（カードは1画面に1つの主役だけ）
- ❌ mono と body の混用（1つのテキスト内で混ぜない。役割で使い分ける）
- ❌ トークンを介さない生色指定（`#0087a8` を直接書かず `var(--color-accent)`）
