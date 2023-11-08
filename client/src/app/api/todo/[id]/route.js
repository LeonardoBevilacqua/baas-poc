import { TodoService } from "@/app/api/todo/todo.service";
import { TodoSupabaseRepository } from "backend/infra/repository/supabase/todo-supabase.repo";
import { NextResponse } from "next/server";

/**
 * @param {import("next/server").NextRequest} request
 * @param {{params: {id: string}}} params
 * @returns
 */
export async function DELETE(request, { params }) {
  const todoService = new TodoService(
    TodoSupabaseRepository.Instance(request.cookies)
  );

  const { id } = params;
  await todoService.delete(id);
  return NextResponse.json(null, { status: 200 });
}
