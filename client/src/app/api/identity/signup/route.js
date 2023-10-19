import { signUp } from "@/app/identity.service";

export async function POST(request) {
  const body = await request.json();
  const result = await signUp(body.email, body.password);
  const response = NextResponse.json({}, { status: 200 });
  const token = await result.result.user.getIdToken();
  response.cookies.set({
    name: "token",
    value: token,
    path: "/",
  });
  return response;
}
