import { getFirestore } from "firebase-admin/firestore";
import admin_firebase_app from "../admin-config";

export class TodoFirestoreRepository {
  /**
   * @type {TodoFirestoreRepository}
   */
  static #instance;
  #database;
  #collection = "todo";
  #admin = admin_firebase_app;
  #userId;

  constructor() {
    this.#database = getFirestore();
  }

  /**
   * @returns {TodoFirestoreRepository}
   */
  static Instance(userId) {
    const currentInstance = this.#instance ? this.#instance : (this.#instance = new this());
    currentInstance.#userId = userId;
    return currentInstance;
  }

  async insert(item) {
    await this.#database.collection(this.#collection).add(item);

    return item;
  }
  async findAll() {
    const citiesRef = this.#database.collection(this.#collection);
    const snapshot = await citiesRef.get();
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  }
  async findAllByUser(userId) {
    const citiesRef = this.#database
      .collection(this.#collection)
      .where("userId", "==", userId);
    const snapshot = await citiesRef.get();
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  }
  // eslint-disable-next-line no-unused-vars
  async findById(id) {
    throw Error("not implemented");
  }
  // eslint-disable-next-line no-unused-vars
  async existsById(id) {
    throw Error("not implemented");
  }
  async delete(id) {
    const reference = this.#database.collection(this.#collection).doc(id);
    const data = (await reference.get()).data();
    if (data.userId === this.#userId) {
      await reference.delete();
    }
  }
  async update(item) {
    const reference = this.#database.collection(this.#collection).doc(item.id);
    const data = (await reference.get()).data();
    if (data.userId === this.#userId) {
      await reference.update({ ...item });
      return null;
    }

    return item;
  }
}
