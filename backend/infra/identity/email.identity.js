import { EmailAuthenticationIdentity } from "./authentication/email-authentication.identity";
import { EmailInMemoryIdentity } from "./local/email-in-memory.identity";

export class EmailIdentity {
  static _instance;
  /**
   * @type {EmailInMemoryIdentity|EmailAuthenticationIdentity}
   */
  repo;

  constructor(type) {
    switch (type) {
      case "local":
        this.repo = EmailInMemoryIdentity.Instance();
        break;
      case "firebase":
        this.repo = EmailAuthenticationIdentity.Instance();
        break;
      default:
        throw Error("not valid identity!");
    }
  }

  /**
   *
   * @returns {EmailInMemoryIdentity|EmailAuthenticationIdentity}
   */
  static Instance(type) {
    return this._instance ? this._instance : (this._instance = new this(type));
  }

  async signIn(email, password) {
    return this.repo.signIn(email, password);
  }
  async signUp(email, password) {
    return this.repo.signUp(email, password);
  }
  async isUserLogged(idToken) {
    return this.repo.isUserLogged2(idToken);
  }
  async signOutUser() {
    this.repo.signOutUser();
  }
}
