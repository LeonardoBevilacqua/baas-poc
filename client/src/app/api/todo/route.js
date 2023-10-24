import { addTodo, getTodos } from "@/app/todo.service";
import { AdminIdentity } from "backend/infra/identity/admin.identity";
import { NextResponse } from "next/server";

export async function POST(request) {
  if (!(await isTokenValid(request))) {
    return Unauthorized();
  }
  const body = await request.json();
  const todo = await addTodo(body);
  return Response.json({ todo }, { status: 201 });
}

function Unauthorized() {
  const response = NextResponse.json(null, { status: 401 });
  response.cookies.delete("token");
  return response;
}

export async function GET(request) {
  if (!(await isTokenValid(request))) {
    return Unauthorized();
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
