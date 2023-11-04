import { unauthorized } from "@/app/api/http-response";
import {
  AdminIdentityService
} from "@/app/api/identity/identity.service";
import { addTodo, getTodosByUser } from "@/app/api/todo/todo.service";

const adminIdentityService = new AdminIdentityService(
  // eslint-disable-next-line no-undef
  AdminIdentity.Instance(process.env.BACKEND_DRIVER)
);

export async function POST(request) {
  const token = request.cookies.get("token").value;
  if (!(await adminIdentityService.isUserLogged(token))) {
    return unauthorized();
  }
  const body = {
    ...(await request.json()),
    userId: await adminIdentityService.getLoggedUserUid(token),
  };
  const todo = await addTodo(body);
  return Response.json({ todo }, { status: 201 });
}

export async function GET(request) {
  const token = request.cookies.get("token").value;
  if (!(await adminIdentityService.isUserLogged(token))) {
    return unauthorized();
  }
  return Response.json(await getTodosByUser(await adminIdentityService.getLoggedUserUid(token)), {
    status: 200,
  });
}
