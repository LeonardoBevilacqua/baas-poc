import admin from "firebase-admin";
import admin_firebase_app from "../admin-config";

export class AdminAuthenticationIdentity {
  static _instance;
  adminAuth;

  constructor() {
    this.adminAuth = admin.auth(admin_firebase_app);
  }

  /**
   *
   * @returns {AdminAuthenticationIdentity}
   */
  static Instance() {
    return this._instance ? this._instance : (this._instance = new this());
  }

  async isUserLogged(idToken) {
    try {
      const decodedToken = await this.adminAuth.verifyIdToken(idToken);
      return !!decodedToken.uid;
    } catch (error) {
      return false;
    }
  }

  async getLoggedUserUid(idToken) {
    try {
      const decodedToken = await this.adminAuth.verifyIdToken(idToken);
      return decodedToken.uid;
    } catch (error) {
      return null;
    }
  }
}
