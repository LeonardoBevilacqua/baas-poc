import { IdentityService } from "@/app/api/identity/identity.service";
import { EmailSupaBaseIdentity } from "backend/infra/identity/supabase/email-supabase.identity";
import { NextResponse } from "next/server";

export async function POST(request) {
  const identityService = new IdentityService(EmailSupaBaseIdentity.Instance(request.cookies));
  const body = await request.json();
  const result = await identityService.signIn(body.email, body.password);
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
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
