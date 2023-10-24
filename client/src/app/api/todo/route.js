import { addTodo, getTodosByUser } from "@/app/todo.service";
import { AdminIdentity } from "backend/infra/identity/admin.identity";
import { NextResponse } from "next/server";

const driver = "firebase";
const adminIdentity = AdminIdentity.Instance(driver);

export async function POST(request) {
  const token = request.cookies.get("token").value;
  if (!(await isTokenValid(token))) {
    return Unauthorized();
  }
  const body = {
    ...(await request.json()),
    userId: await adminIdentity.getLoggedUserUid(token),
  };
  const todo = await addTodo(body);
  return Response.json({ todo }, { status: 201 });
}

export async function GET(request) {
  const token = request.cookies.get("token").value;
  if (!(await isTokenValid(token))) {
    return Unauthorized();
  }
  return Response.json(
    await getTodosByUser(await adminIdentity.getLoggedUserUid(token)),
    { status: 200 }
  );
}

async function isTokenValid(token) {
  return !!token && (await adminIdentity.isUserLogged(token));
}

function Unauthorized() {
  return NextResponse.json(null, { status: 401 });
}
