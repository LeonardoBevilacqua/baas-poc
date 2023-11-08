import { IdentityService } from "@/app/api/identity/identity.service";
import { EmailSupaBaseIdentity } from "backend/infra/identity";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const cookieStore = cookies();

  const { email } = (await getEmail()) ?? {
    email: null,
  };

  async function getEmail() {
    const identityService = new IdentityService(
      EmailSupaBaseIdentity.Instance(cookieStore)
    );
    return await identityService.getLoggedUser();
  }

  const signOutAction = async () => {
    "use server";
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
