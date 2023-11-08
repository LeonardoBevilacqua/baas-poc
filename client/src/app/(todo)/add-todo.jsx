import { TodoService } from "@/app/api/todo/todo.service";
import { TodoSupabaseRepository } from "backend/infra/supabase/repository/todo-supabase.repo";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default function AddTodo() {
  const addAction = async (formData) => {
    "use server";
    const description = formData.get("description");
    const cookieStore = cookies();
    const todoService = new TodoService(
      TodoSupabaseRepository.Instance(cookieStore)
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
