import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebase_app } from "../../firebase/config";

export class EmailAuthenticationIdentity {
  static _instance;
  auth;

  constructor() {
    this.auth = getAuth(firebase_app);
  }

  /**
   *
   * @returns {EmailAuthenticationIdentity}
   */
  static Instance() {
    return this._instance ? this._instance : (this._instance = new this());
  }

  async signIn(email, password) {
    let result = null,
      error = null;
    try {
      /**
       * @type {import("firebase/auth").UserCredential}
       */
      result = await signInWithEmailAndPassword(this.auth, email, password);
    } catch (e) {
      error = e;
    }

    return { result, error };
  }

  async signUp(email, password) {
    let result = null,
      error = null;
    try {
      result = await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (e) {
      error = e;
    }

    return { result, error };
  }

  async signOutUser() {
    await signOut(this.auth);
  }
}
