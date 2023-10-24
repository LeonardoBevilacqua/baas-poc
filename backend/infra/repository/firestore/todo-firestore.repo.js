
import { getFirestore } from "firebase-admin/firestore";
import admin_firebase_app from "../../firebase/admin-config";

export class TodoFirestoreRepository {
  static _instance;
  userId;
  database;
  collection = "todo";
  admin = admin_firebase_app;

  constructor(userId) {
    this.userId = userId;
    this.database = getFirestore();
  }

  /**
   *
   * @param {number} userId user id
   * @returns {TodoFirestoreRepository}
   */
  static Instance(userId) {
    if (this._instance) {
      this._instance.userId = userId;
      return this._instance;
    }
    return (this._instance = new this(userId));
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
