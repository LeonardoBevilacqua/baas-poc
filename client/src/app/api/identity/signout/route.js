import { IdentityService } from "@/app/api/identity/identity.service";
import { EmailSupaBaseIdentity } from "backend/infra/identity/supabase/email-supabase.identity";
import { NextResponse } from "next/server";

export async function GET(request) {
  const identityService = new IdentityService(EmailSupaBaseIdentity.Instance(request.cookies));
  await identityService.signOutUser();
  const response = NextResponse.redirect("http://localhost:3000/account");
  response.cookies.delete("token");

  return response;
}
