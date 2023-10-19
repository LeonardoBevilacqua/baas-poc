"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTodo() {
  const route = useRouter();
  const [description, setDescription] = useState("");

  async function submit(e) {
    e.preventDefault();
    await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: new Date().getTime(),
        description,
        completed: "no",
        userId: 1,
      }),
    });

    setDescription("");
    route.refresh();
    route.push("/");
  }

  return (
    <div>
      <form action="/action_page.php">
        <fieldset>
          <legend>Add new todo:</legend>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={submit}>Add</button>
        </fieldset>
      </form>
    </div>
  );
}
