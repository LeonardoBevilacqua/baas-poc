import { unauthorized } from "@/app/api/http-response";
import { AdminIdentityService } from "@/app/api/identity/identity.service";
import { TodoService } from "@/app/api/todo/todo.service";
import { AdminIdentity } from "backend/infra/identity/admin.identity";
import { TodoSupabaseRepository } from "backend/infra/repository/supabase/todo-supabase.repo";
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
  const adminIdentityService = new AdminIdentityService(
    // eslint-disable-next-line no-undef
    AdminIdentity.Instance(process.env.BACKEND_DRIVER)
  );
  const token = request.cookies.get("token").value;
  if (!(await adminIdentityService.isUserLogged(token))) {
    return unauthorized();
  }

  const userId = await adminIdentityService.getLoggedUserUid(token);

  const { id, completed } = params;
  await todoService.update({ id, completed: completed === "true" }, userId);

  return NextResponse.json(null, { status: 200 });
}
