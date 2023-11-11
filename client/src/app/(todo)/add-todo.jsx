import { TodoService } from "@/app/api/todo/todo.service";
import { createClient } from "@/utils/supabase/server";
import { TodoSupabaseRepository } from "backend/infra/repository";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default function AddTodo() {
  const addAction = async (formData) => {
    "use server";
    const description = formData.get("description");
    const cookieStore = cookies();
    const todoService = new TodoService(
      new TodoSupabaseRepository(createClient(cookieStore))
    );
    await todoService.add({ description });
    revalidatePath("/");
  };

  return (
    <div>
      <form action={addAction}>
        <fieldset>
          <legend>Add new todo:</legend>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" />
          <button type="submit">Add</button>
        </fieldset>
      </form>
    </div>
  );
}
