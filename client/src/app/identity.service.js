import { EmailIdentity } from "backend/infra/identity/email.identity";

const driver = "firebase";
const identity = EmailIdentity.Instance(driver);

export async function signUp(email, password) {
  return await identity.signUp(email, password);
}

export async function signIn(email, password) {
  const response = await identity.signIn(email, password);
  // await identity.isUserLogged2(await response.result.user.getIdToken());

  return response;
}

export async function isUserLogged() {
  return await identity.isUserLogged();
}

export async function isUserLogged2(idToken) {
  return await identity.isUserLogged2(idToken);
}
