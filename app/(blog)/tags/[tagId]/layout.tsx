import { getTag } from '@/libs/microcms';
import PageHead from '@/components/PageHead';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    tagId: string;
  }>;
};

export default async function TagsLayout(props: Props) {
  const params = await props.params;

  const { children } = props;

  const { tagId } = params;
  const tag = await getTag(tagId);
  return (
    <div>
      <PageHead eyebrow="/ tags" title={`#${tag.name}`} lead="このタグが付いた記事の一覧" />
      <div>{children}</div>
    </div>
  );
}
