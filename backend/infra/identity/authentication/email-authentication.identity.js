import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase_app from "../../firebase/config";

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
      result = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(result);
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
      console.log(result);
    } catch (e) {
      error = e;
    }

    return { result, error };
  }
}
