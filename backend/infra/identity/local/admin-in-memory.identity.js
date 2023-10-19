import admin from "firebase-admin";
import { admin_firebase_app } from "../../firebase/config";

export class AdminInMemoryIdentity {
  static _instance;
  adminAuth;

  constructor() {
    this.adminAuth = admin.auth(admin_firebase_app);
  }

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
}
