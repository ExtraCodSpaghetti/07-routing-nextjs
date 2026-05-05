
import NoteDetailsClient from "./NoteDetails.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { JSX } from "react/jsx-runtime";

// Основной компонент (АСИНХРОННЫЙ = работает на сервере)
export default (async function NoteDetailsPage({
  // Получаем параметры из URL (в данном случае, id заметки)
  params,
}: {
  params: { id: string };
}) {
    // 1. Создаем React Query клиент
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ // 2. Предварительно загружаем данные заметки по id
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });
  return ( // 3. Оборачиваем клиентский компонент в HydrationBoundary, передавая ему предварительно загруженные данные
    <HydrationBoundary state={dehydrate(queryClient)}> 
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}) as unknown as (props: { params: { id: string } }) => Promise<JSX.Element>; // Типизация для асинхронного компонента, который возвращает JSX.Element