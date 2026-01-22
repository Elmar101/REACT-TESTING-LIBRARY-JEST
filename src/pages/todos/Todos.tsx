import { useCreateTodoMutation, useGetTodosQuery } from "@/features/api/auth";
import { useState } from "react";

export function Todos() {
  const { data, isLoading, isError } = useGetTodosQuery();
  const [title, setTitle] = useState("");
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      <h2>Todos</h2>

      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <button
        onClick={() => createTodo({ title }).unwrap().then(() => setTitle(""))}
        disabled={isCreating || title.trim().length === 0}
      >
        Add
      </button>

      <ul>
        {data?.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
