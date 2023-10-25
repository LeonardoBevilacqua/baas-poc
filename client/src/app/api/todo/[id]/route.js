import { deleteTodo } from "@/app/api/todo/todo.service";
import { AdminIdentity } from "backend/infra/identity/admin.identity";
import { NextRequest, NextResponse } from "next/server";

const driver = "firebase";
const adminIdentity = AdminIdentity.Instance(driver);
/**
 * @param {NextRequest} request
 * @param {{params: {id: string}}} params
 * @returns
 */
export async function DELETE(request, { params }) {
  const token = request.cookies.get("token").value;
  if (!(await isTokenValid(token))) {
    return Unauthorized();
  }

  const { id } = params;
  await deleteTodo(id);
  return NextResponse.json(null, { status: 200 });
}

async function isTokenValid(token) {
  return !!token && (await adminIdentity.isUserLogged(token));
}

function Unauthorized() {
  return NextResponse.json(null, { status: 401 });
}
