import { TodoService } from "@/app/api/todo/todo.service";
import { createClient } from "@/utils/supabase/server";
import { TodoSupabaseRepository } from "backend/infra/repository";
import { NextResponse } from "next/server";

/**
 * @param {import("next/server").NextRequest} request
 * @param {{params: {id: string}}} params
 * @returns
 */
export async function DELETE(request, { params }) {
  const todoService = new TodoService(
    new TodoSupabaseRepository(createClient(request.cookies))
  );

  const { id } = params;
  await todoService.delete(id);
  return NextResponse.json(null, { status: 200 });
}
