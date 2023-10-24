export class AdminInMemoryIdentity {
  static _instance;

  constructor() {}

  /**
   *
   * @returns {AdminInMemoryIdentity}
   */
  static Instance() {
    return this._instance ? this._instance : (this._instance = new this());
  }

  async isUserLogged(idToken) {
    return false;
  }

  async getLoggedUserUid(idToken) {
    return "fake-id";
  }
}
