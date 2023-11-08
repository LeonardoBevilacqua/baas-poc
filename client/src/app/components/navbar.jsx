import {
  AdminIdentityService,
  IdentityService,
} from "@/app/api/identity/identity.service";
import { AdminSupabaseIdentity } from "backend/infra/supabase/identity/admin-supabase.identity";
import { EmailSupaBaseIdentity } from "backend/infra/supabase/identity/email-supabase.identity";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const cookieStore = cookies();
  const adminIdentityService = new AdminIdentityService(
    AdminSupabaseIdentity.Instance(cookieStore)
  );
  const { email } = (await adminIdentityService.getUserSession()) ?? {
    email: null,
  };

  const signOutAction = async () => {
    "use server";

    const cookieStore = cookies();
    const identityService = new IdentityService(
      EmailSupaBaseIdentity.Instance(cookieStore)
    );
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
