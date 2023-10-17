import { signIn } from "@/app/identity.service";

export async function POST(request) {
  const body = await request.json();
  await signIn(body.email, body.password);
  return Response.json({}, { status: 200 });
}
