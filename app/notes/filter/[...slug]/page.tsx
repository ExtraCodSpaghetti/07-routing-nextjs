import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './NotesClient';

type Props = {
  params: { slug: string[] };
};

export default async function NotesPage({ params }: Props) {
  // Добавляем "await" для параметров (это обязательно в Next.js 14)
  const { slug } = await Promise.resolve(params);

  const queryClient = new QueryClient();

  const rawTag = slug?.[0] || '';
  const tag = rawTag.toLowerCase() === 'all' ? '' : rawTag;

  const data = await fetchNotes(1, 12, '', tag);

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => Promise.resolve(data),
  });
  console.log('NotesClient component:', NotesClient); // Должна вывести функцию, а не объект

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={data} tag={tag} />
    </HydrationBoundary>
  );
}
console.log('NotesClient component:', NotesClient); // Должна вывести функцию, а не объект