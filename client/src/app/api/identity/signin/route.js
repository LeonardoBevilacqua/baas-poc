import { signIn } from "@/app/api/identity/identity.service";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const result = await signIn(body.email, body.password);
  const response = NextResponse.json(
    { user: result.result.user },
    { status: 200 }
  );
  const token = await result.result.user.getIdToken();
  response.cookies.set({
    name: "token",
    value: token,
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
