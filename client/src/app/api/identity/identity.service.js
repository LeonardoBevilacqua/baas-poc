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
}

export class AdminIdentityService {
  adminIdentity;
  constructor(adminIdentity) {
    this.adminIdentity = adminIdentity;
  }

  async isUserLogged(token) {
    return !!token && (await this.adminIdentity.isUserLogged(token));
  }

  async getLoggedUserUid(token) {
    return await this.adminIdentity.getLoggedUserUid(token);
  }

  async getUserSession() {
    return this.adminIdentity.getUserSession();
  }
}
