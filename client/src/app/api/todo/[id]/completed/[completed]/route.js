import { TodoService } from "@/app/api/todo/todo.service";
import { TodoSupabaseRepository } from "backend/infra/repository";
import { NextResponse } from "next/server";

/**
 * @param {import("next/server").NextRequest} request
 * @param {{params: {id: string, completed: boolean}}} param1
 * @returns
 */
export async function PATCH(request, { params }) {
  const todoService = new TodoService(
    TodoSupabaseRepository.Instance(request.cookies)
  );

  const { id, completed } = params;
  await todoService.update({ id, completed: completed === "true" });

  return NextResponse.json(null, { status: 200 });
}
