"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "../../../lib/api";
import css from "./NoteDetails.module.css";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  

  const { data: note, isLoading, error } = useQuery({ // 1. Используем хук useQuery для получения данных заметки по id
    queryKey: ["note", id], // 2. Уникальный ключ для кэширования данных заметки
    queryFn: () => fetchNoteById(id), // 3. Функция для получения данных заметки по id
    refetchOnMount: false, // 4. Не перезапрашивать данные при каждом монтировании компонента
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.updatedAt // 5. Форматируем дату в зависимости от наличия updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	  </div>
	  <p className={css.content}>{note.content}</p>
      <button className={css.editBtnDetails}>Edit note</button>
	  <p className={css.date}>{formattedDate}</p>
	</div>
</div>
  );
};

export default NoteDetailsClient;