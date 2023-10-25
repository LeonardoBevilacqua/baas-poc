import { signOutUser } from "@/app/identity.service";
import { NextResponse } from "next/server";

export async function GET() {
  await signOutUser();
  const response = NextResponse.redirect("http://localhost:3000/account");
  response.cookies.delete("token");

  return response;
}
