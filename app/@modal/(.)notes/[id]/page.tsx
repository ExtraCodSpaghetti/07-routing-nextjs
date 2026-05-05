import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api';
import NotePreview from './NotePreview.client';


export default async function NoteModalPage({ // Получаем параметры из URL (в данном случае, id заметки)
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary> // Оборачиваем клиентский компонент в HydrationBoundary, передавая ему предварительно загруженные данные
  );
}