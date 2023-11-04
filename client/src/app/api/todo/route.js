import { unauthorized } from "@/app/api/http-response";
import { AdminIdentityService } from "@/app/api/identity/identity.service";
import { TodoService } from "@/app/api/todo/todo.service";
import { AdminSupabaseIdentity } from "backend/infra/identity/supabase/admin-supabase.identity";
import { TodoSupabaseRepository } from "backend/infra/repository/supabase/todo-supabase.repo";

export async function POST(request) {
  const adminIdentityService = new AdminIdentityService(
    AdminSupabaseIdentity.Instance(request.cookies)
  );
  const todoService = new TodoService(
    TodoSupabaseRepository.Instance(request.cookies)
  );
  const token = request.cookies.get("token").value;
  if (!(await adminIdentityService.isUserLogged(token))) {
    return unauthorized();
  }
  const body = {
    ...(await request.json()),
    userId: await adminIdentityService.getLoggedUserUid(token),
  };
  const todo = await todoService.add(body);
  return Response.json({ todo }, { status: 201 });
}

export async function GET(request) {
  const adminIdentityService = new AdminIdentityService(
    AdminSupabaseIdentity.Instance(request.cookies)
  );
  const todoService = new TodoService(
    TodoSupabaseRepository.Instance(request.cookies)
  );
  const token = request.cookies.get("token").value;
  if (!(await adminIdentityService.isUserLogged(token))) {
    return unauthorized();
  }
  const todos = await todoService.getByUser(
    await adminIdentityService.getLoggedUserUid(token)
  );
  return Response.json(todos, {
    status: 200,
  });
}
