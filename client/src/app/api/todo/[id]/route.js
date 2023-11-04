import { unauthorized } from "@/app/api/http-response";
import {
  AdminIdentityService
} from "@/app/api/identity/identity.service";
import { deleteTodo } from "@/app/api/todo/todo.service";
import { AdminIdentity } from "backend/infra/identity/admin.identity";
import { NextResponse } from "next/server";

/**
 * @param {import("next/server").NextRequest} request
 * @param {{params: {id: string}}} params
 * @returns
 */
export async function DELETE(request, { params }) {
  const adminIdentityService = new AdminIdentityService(
    // eslint-disable-next-line no-undef
    AdminIdentity.Instance(process.env.BACKEND_DRIVER)
  );
  const token = request.cookies.get("token").value;
  if (!(await adminIdentityService.isUserLogged(token))) {
    return unauthorized();
  }

  const userId = await adminIdentityService.getLoggedUserUid(token);

  const { id } = params;
  await deleteTodo(id, userId);
  return NextResponse.json(null, { status: 200 });
}
