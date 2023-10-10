import { EmailIdentity } from "backend/infra/identity/email.identity";

const driver = "firebase";
const identity = EmailIdentity.Instance(driver);

export async function signUp(email, password) {
  return await identity.signUp(email, password);
}

export async function signIn(email, password) {
  return await identity.signIn(email, password);
}
