export class EmailInMemoryIdentity {
  static _instance;

  /**
   *
   * @returns {EmailInMemoryIdentity}
   */
  static Instance() {
    return this._instance ? this._instance : (this._instance = new this());
  }

  async signIn(email, password) {
    return;
  }

  async signUp(email, password) {
    return;
  }

  async signOutUser() {
    return;
  }
}
