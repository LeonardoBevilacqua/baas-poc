/* eslint-disable no-unused-vars */
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
    return {
      result: {
        user: {
          getIdToken: () => {
            return "fake-id";
          },
          email,
        },
      },
    };
  }

  async signUp(email, password) {
    return {
      result: {
        user: {
          getIdToken: async () => {
            return "fake-id";
          },
          email,
        },
      },
    };
  }

  async signOutUser() {
    return;
  }
}
