import { IdentityService } from "@/app/api/identity/identity.service";
import { EmailSupaBaseIdentity } from "backend/infra/identity/supabase/email-supabase.identity";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Signin() {
  const signInAction = async (formData) => {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");
    const cookieStore = cookies();

    const identityService = new IdentityService(
      EmailSupaBaseIdentity.Instance(cookieStore)
    );
    const { error } = await identityService.signIn(email, password);

    if (!error) {
      return redirect("/");
    }
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign in</h1>
        <form action={signInAction} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
