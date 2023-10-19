import { isUserLogged } from "@/app/identity.service";
import { addTodo, getTodos } from "@/app/todo.service";

export async function POST(request) {
  const body = await request.json();
  const todo = await addTodo(body);
  return Response.json({ todo }, { status: 201 });
}

export async function GET(request) {
  const token = request.cookies.get("token");
  const valid = !!token && await isUserLogged(token.value);
  if (!valid) {
    return Response.redirect(new URL(`/account`, "localhost:3000"));
  }
  return Response.json(await getTodos(), { status: 200 });
}
