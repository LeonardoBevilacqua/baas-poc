import { unauthorized } from "@/app/api/http-response";
import {
  getLoggedUserUid,
  isUserLogged,
} from "@/app/api/identity/identity.service";
import { addTodo, getTodosByUser } from "@/app/api/todo/todo.service";

export async function POST(request) {
  const token = request.cookies.get("token").value;
  if (!(await isUserLogged(token))) {
    return unauthorized();
  }
  const body = {
    ...(await request.json()),
    userId: await getLoggedUserUid(token),
  };
  const todo = await addTodo(body);
  return Response.json({ todo }, { status: 201 });
}

export async function GET(request) {
  const token = request.cookies.get("token").value;
  if (!(await isUserLogged(token))) {
    return unauthorized();
  }
  return Response.json(await getTodosByUser(await getLoggedUserUid(token)), {
    status: 200,
  });
}
