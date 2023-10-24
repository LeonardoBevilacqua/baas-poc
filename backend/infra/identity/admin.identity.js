import { AdminAuthenticationIdentity } from "./authentication/admin-authentication.identity";
import { AdminInMemoryIdentity } from "./local/admin-in-memory.identity";

export class AdminIdentity {
  static _instance;
  /**
   * @type {AdminInMemoryIdentity|AdminAuthenticationIdentity}
   */
  repo;

  constructor(type) {
    switch (type) {
      case "local":
        this.repo = AdminInMemoryIdentity.Instance();
        break;
      case "firebase":
        this.repo = AdminAuthenticationIdentity.Instance();
        break;
      default:
        throw Error("not valid identity!");
    }
  }

  /**
   *
   * @returns {AdminInMemoryIdentity|AdminAuthenticationIdentity}
   */
  static Instance(type) {
    return this._instance ? this._instance : (this._instance = new this(type));
  }

  async isUserLogged(idToken) {
    return this.repo.isUserLogged(idToken);
  }

  async getLoggedUserUid(idToken) {
    return this.repo.getLoggedUserUid(idToken);
  }
}
