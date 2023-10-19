import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebase_app from "../../firebase/config";
import admin from "firebase-admin";
import firebaseKey from "../../../firebase-key.json";

export class EmailAuthenticationIdentity {
  static _instance;
  auth;
  adminAuth;

  constructor() {
    this.auth = getAuth(firebase_app);
    const admin_firebase_app = admin.initializeApp({
      credential: admin.credential.cert(firebaseKey),
    });
    this.adminAuth = admin.auth(admin_firebase_app);
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

  async isUserLogged(idToken) {
    try {
      const decodedToken = await this.adminAuth.verifyIdToken(idToken);
      return !!decodedToken.uid;
    } catch (error) {
      return error;
    }
  }

  async signOutUser() {
    await signOut(this.auth);
  }
}
