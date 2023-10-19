import { addTodo, getTodos } from "@/app/todo.service";
import { AdminIdentity } from "backend/infra/identity/admin.identity";

export async function POST(request) {
  if (!(await isTokenValid(request))) {
    return Response.json(null, { status: 401 });
  }
  const body = await request.json();
  const todo = await addTodo(body);
  return Response.json({ todo }, { status: 201 });
}

export async function GET(request) {
  if (!(await isTokenValid(request))) {
    return Response.json(null, { status: 401 });
  }
  return Response.json(await getTodos(), { status: 200 });
}

async function isTokenValid(request) {
  const token = request.cookies.get("token");
  return !!token && (await isUserLogged(token.value));
}

async function isUserLogged(idToken) {
  const driver = "firebase";
  const adminIdentity = AdminIdentity.Instance(driver);
  return await adminIdentity.isUserLogged(idToken);
}