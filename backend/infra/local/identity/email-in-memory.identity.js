/* eslint-disable no-unused-vars */
export class EmailInMemoryIdentity {
  /**
   * @type {EmailInMemoryIdentity}
   */
  static #instance;
  #email;

  /**
   *
   * @returns {EmailInMemoryIdentity}
   */
  static Instance() {
    return this.#instance ? this.#instance : (this.#instance = new this());
  }

  async signIn(email, password) {
    this.#email = email;
    return {
      data: {
        user: {
          id: "fake-id",
          email,
        },
      },
      error: null,
    };
  }

  async signUp(email, password) {
    this.#email = email;
    return {
      data: {
        user: {
          id: "fake-id",
          email,
        },
      },
      error: null,
    };
  }

  async signOutUser() {
    return;
  }

  async getLoggedUser() {
    return {
      email: this.#email,
      id: "fake-id",
    };
  }
}
