import { getFirestore } from "firebase-admin/firestore";
import admin_firebase_app from "../../firebase/admin-config";

export class TodoFirestoreRepository {
  static _instance;
  database;
  collection = "todo";
  admin = admin_firebase_app;

  constructor() {
    this.database = getFirestore();
  }

  /**
   * @returns {TodoFirestoreRepository}
   */
  static Instance() {
    return this._instance ? this._instance : (this._instance = new this());
  }

  async insert(item) {
    const res = await this.database.collection(this.collection).add(item);

    return item;
  }
  async findAll() {
    const citiesRef = this.database.collection(this.collection);
    const snapshot = await citiesRef.get();
    return snapshot.docs.map((doc) => doc.data());
  }
  async findAllByUser(userId) {
    const citiesRef = this.database
      .collection(this.collection)
      .where("userId", "==", userId);
    const snapshot = await citiesRef.get();
    return snapshot.docs.map((doc) => doc.data());
  }
  async findById(id) {
    throw Error("not implemented");
  }
  async existsById(id) {
    throw Error("not implemented");
  }
  async delete(id) {
    throw Error("not implemented");
  }
  async update(item) {
    throw Error("not implemented");
  }
}
