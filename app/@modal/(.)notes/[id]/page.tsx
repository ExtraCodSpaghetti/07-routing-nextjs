import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api';
import NotePreview from './NotePreview.client';

type NotePreviewProps = {
  params: { id: string };
};

export default async function NoteModalPage({ params }: NotePreviewProps) {
    
    const { id } = params;
    const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}