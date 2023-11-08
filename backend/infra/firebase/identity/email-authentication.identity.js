import admin from "firebase-admin";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import admin_firebase_app from "../admin-config";
import firebase_app from "../config";

export class EmailAuthenticationIdentity {
  /**
   * @type {EmailAuthenticationIdentity}
   */
  static #instance;
  #auth;
  #adminAuth;
  #idToken;

  constructor() {
    this.#auth = getAuth(firebase_app);
    this.#adminAuth = admin.auth(admin_firebase_app);
  }

  /**
   *
   * @returns {EmailAuthenticationIdentity}
   */
  static Instance(idToken) {
    const currentInstance = this.#instance
      ? this.#instance
      : (this.#instance = new this());
    currentInstance.#idToken = idToken;
    return currentInstance;
  }

  async signIn(email, password) {
    let data = null,
      error = null;
    try {
      /**
       * @type {import("firebase/auth").UserCredential}
       */
      data = await signInWithEmailAndPassword(this.#auth, email, password);
    } catch (e) {
      error = e;
    }

    if (error) {
      console.log("signIn", error);
    }

    return { data, error };
  }

  async signUp(email, password) {
    let data = null,
      error = null;
    try {
      data = await createUserWithEmailAndPassword(
        this.#auth,
        email,
        password
      );
    } catch (e) {
      error = e;
    }

    if (error) {
      console.log("signUp", error);
    }

    return { data, error };
  }

  async signOutUser() {
    await signOut(this.#auth);
  }

  async getLoggedUser() {
    try {
      const decodedToken = await this.#adminAuth.verifyIdToken(this.#idToken);
      return decodedToken;
    } catch (error) {
      console.log("getLoggedUser", error);
      return null;
    }
  }
}
