import { IdentityService } from "@/app/api/identity/identity.service";
import { EmailSupaBaseIdentity } from "backend/infra/supabase/identity/email-supabase.identity";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const cookieStore = cookies();
  const identityService = new IdentityService(
    EmailSupaBaseIdentity.Instance(cookieStore)
  );
  const { email } = (await identityService.getLoggedUser()) ?? {
    email: null,
  };

  const signOutAction = async () => {
    "use server";

    await identityService.signOutUser();
    return redirect("/account");
  };

  return (
    <div>
      <h1>{email ? `Welcome ${email}` : "Please, login"}</h1>
      <ul>
        {email && (
          <li>
            <form action={signOutAction}>
              <button>Logout</button>
            </form>
          </li>
        )}
      </ul>
    </div>
  );
}
