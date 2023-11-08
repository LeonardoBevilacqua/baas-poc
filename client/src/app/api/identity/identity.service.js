export class IdentityService {
  identity;
  constructor(identity) {
    this.identity = identity;
  }

  async signUp(email, password) {
    return await this.identity.signUp(email, password);
  }

  async signIn(email, password) {
    return await this.identity.signIn(email, password);
  }

  async signOutUser() {
    await this.identity.signOutUser();
  }

  async getLoggedUser() {
    return this.identity.getLoggedUser();
  }
}
