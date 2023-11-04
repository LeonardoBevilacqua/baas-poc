import { unauthorized } from "@/app/api/http-response";
import { AdminIdentityService } from "@/app/api/identity/identity.service";
import { TodoService } from "@/app/api/todo/todo.service";
import { AdminSupabaseIdentity } from "backend/infra/identity/supabase/admin-supabase.identity";
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
  const adminIdentityService = new AdminIdentityService(
    AdminSupabaseIdentity.Instance(request.cookies)
  );
  const token = request.cookies.get("token").value;
  if (!(await adminIdentityService.isUserLogged(token))) {
    return unauthorized();
  }

  const userId = await adminIdentityService.getLoggedUserUid(token);

  const { id } = params;
  await todoService.delete(id, userId);
  return NextResponse.json(null, { status: 200 });
}
