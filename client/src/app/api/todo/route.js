import { unauthorized } from "@/app/api/http-response";
import { AdminIdentityService } from "@/app/api/identity/identity.service";
import { TodoService } from "@/app/api/todo/todo.service";
import { AdminIdentity } from "backend/infra/identity/admin.identity";
import { TodoSupabaseRepository } from "backend/infra/repository/supabase/todo-supabase.repo";

const adminIdentityService = new AdminIdentityService(
  // eslint-disable-next-line no-undef
  AdminIdentity.Instance(process.env.BACKEND_DRIVER)
);

export async function POST(request) {
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
  const todoService = new TodoService(
    TodoSupabaseRepository.Instance(request.cookies)
  );
  const token = request.cookies.get("token").value;
  if (!(await adminIdentityService.isUserLogged(token))) {
    return unauthorized();
  }
  const todos = await todoService.getAll();
  return Response.json(todos, {
    status: 200,
  });
}
