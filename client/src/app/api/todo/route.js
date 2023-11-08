import { TodoService } from "@/app/api/todo/todo.service";
import { TodoSupabaseRepository } from "backend/infra/repository/supabase/todo-supabase.repo";

export async function POST(request) {
  const todoService = new TodoService(
    TodoSupabaseRepository.Instance(request.cookies)
  );
  const body = {
    ...(await request.json()),
  };
  const todo = await todoService.add(body);
  return Response.json({ todo }, { status: 201 });
}
