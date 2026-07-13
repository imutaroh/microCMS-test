import { Metadata } from 'next';
import { getList } from '@/libs/microcms';
import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import PageHead from '@/components/PageHead';

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  return {
    title: '「' + searchParams.q + '」の検索結果',
    openGraph: {
      title: '「' + searchParams.q + '」の検索結果',
    },
    alternates: {
      canonical: `/search?q=${searchParams.q}`,
    },
  };
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const data = await getList({
    q: searchParams.q,
  });

  return (
    <>
      <PageHead
        eyebrow="/ search"
        title={`「${searchParams.q ?? ''}」`}
        lead={`${data.totalCount}件の検索結果`}
      />
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath="/search" q={searchParams.q} />
    </>
  );
}
