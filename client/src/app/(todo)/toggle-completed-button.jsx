"use client";
import { useRouter } from "next/navigation";

/**
 * @param {{todo:{id: string, completed: boolean}}} props
 */
export default function ToggleCompletedButton({ todo: { completed, id } }) {
  const route = useRouter();

  async function toggleCompleted() {
    await fetch(`/api/todo/${id}/completed/${!completed}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    route.refresh();
  }

  return <button onClick={toggleCompleted}>Toggle completed</button>;
}
