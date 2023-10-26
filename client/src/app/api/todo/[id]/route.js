import { unauthorized } from "@/app/api/http-response";
import {
  getLoggedUserUid,
  isUserLogged,
} from "@/app/api/identity/identity.service";
import { deleteTodo } from "@/app/api/todo/todo.service";
import { NextResponse } from "next/server";

/**
 * @param {import("next/server").NextRequest} request
 * @param {{params: {id: string}}} params
 * @returns
 */
export async function DELETE(request, { params }) {
  const token = request.cookies.get("token").value;
  if (!(await isUserLogged(token))) {
    return unauthorized();
  }

  const userId = await getLoggedUserUid(token);

  const { id } = params;
  await deleteTodo(id, userId);
  return NextResponse.json(null, { status: 200 });
}
