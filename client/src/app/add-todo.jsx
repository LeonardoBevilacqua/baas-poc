"use client";

import { useState } from "react";

export default function AddTodo() {
  const [description, setDescription] = useState("");

  function submit(e) {
    e.preventDefault();
    alert(`submit ${description}`);
    setDescription("");
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
