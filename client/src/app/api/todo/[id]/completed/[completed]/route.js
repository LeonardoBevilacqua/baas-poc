import { unauthorized } from "@/app/api/http-response";
import {
  getLoggedUserUid,
  isUserLogged,
} from "@/app/api/identity/identity.service";
import { updateTodo } from "@/app/api/todo/todo.service";
import { NextResponse } from "next/server";

/**
 * @param {import("next/server").NextRequest} request
 * @param {{params: {id: string, completed: boolean}}} param1
 * @returns
 */
export async function PATCH(request, { params }) {
  const token = request.cookies.get("token").value;
  if (!(await isUserLogged(token))) {
    return unauthorized();
  }

  const userId = await getLoggedUserUid(token);

  const { id, completed } = params;
  await updateTodo({ id, completed: completed === "true" }, userId);

  return NextResponse.json(null, { status: 200 });
}
