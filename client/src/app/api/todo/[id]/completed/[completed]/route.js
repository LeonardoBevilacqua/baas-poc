import { AdminIdentity } from "backend/infra/identity/admin.identity";
import { NextResponse } from "next/server";
import { updateTodo } from "../../../todo.service";

const driver = "firebase";
const adminIdentity = AdminIdentity.Instance(driver);

/**
 * @param {import("next/server").NextRequest} request
 * @param {{params: {id: string, completed: boolean}}} param1
 * @returns
 */
export async function PATCH(request, { params }) {
  const token = request.cookies.get("token").value;
  if (!(await isTokenValid(token))) {
    return Unauthorized();
  }

  const userId = await adminIdentity.getLoggedUserUid(token);

  const { id, completed } = params;
  await updateTodo({ id, completed: completed === "true" }, userId);

  return NextResponse.json(null, { status: 200 });
}

async function isTokenValid(token) {
  return !!token && (await adminIdentity.isUserLogged(token));
}

function Unauthorized() {
  return NextResponse.json(null, { status: 401 });
}
