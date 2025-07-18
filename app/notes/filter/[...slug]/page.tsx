import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './NotesClient';
import { JSX } from 'react/jsx-runtime';

export default (async function NotesPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const queryClient = new QueryClient();
  const rawTag = params.slug?.[0] || '';
  const tag = rawTag.toLowerCase() === 'all' ? '' : rawTag;
  const data = await fetchNotes(1, 12, '', tag);
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => Promise.resolve(data),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={data} tag={tag} />
    </HydrationBoundary>
  );
}) as unknown as (props: { params: { slug: string[] } }) => Promise<JSX.Element>;