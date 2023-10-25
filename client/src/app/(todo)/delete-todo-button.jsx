"use client";
import { useRouter } from "next/navigation";

/**
 * @param {{id: string}} props
 */
export default function DeleteTodoButton({ id }) {
  const route = useRouter();

  async function deleteTodo() {
    await fetch(`/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    route.refresh();
  }

  return <button onClick={deleteTodo}>Delete</button>;
}
