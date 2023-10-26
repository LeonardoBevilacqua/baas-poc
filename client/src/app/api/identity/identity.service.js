import { AdminIdentity } from "backend/infra/identity/admin.identity";
import { EmailIdentity } from "backend/infra/identity/email.identity";

const driver = "firebase";
const identity = EmailIdentity.Instance(driver);
const adminIdentity = AdminIdentity.Instance(driver);


export async function signUp(email, password) {
  return await identity.signUp(email, password);
}

export async function signIn(email, password) {
  return await identity.signIn(email, password);
}

export async function signOutUser() {
  await identity.signOutUser();
}

export async function isUserLogged(token) {
  return !!token && (await adminIdentity.isUserLogged(token));
}

export async function getLoggedUserUid(token) {
  return await adminIdentity.getLoggedUserUid(token);
}
