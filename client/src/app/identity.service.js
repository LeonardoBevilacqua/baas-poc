import { EmailIdentity } from "backend/infra/identity/email.identity";
// import { AdminIdentity } from "backend/infra/identity/admin.identity";

const driver = "firebase";
const identity = EmailIdentity.Instance(driver);
// const adminIdentity = AdminIdentity.Instance(driver);

export async function signUp(email, password) {
  return await identity.signUp(email, password);
}

export async function signIn(email, password) {
  return await identity.signIn(email, password);
}

// export async function isUserLogged(idToken) {
//   return await adminIdentity.isUserLogged(idToken);
// }
