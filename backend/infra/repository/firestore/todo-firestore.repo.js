import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import firebase_app from "../../firebase/config";

export class TodoFirestoreRepository {
  static _instance;
  userId;
  database;
  collection = "todo";

  constructor(userId) {
    this.userId = userId;
    this.database = getFirestore(firebase_app);
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
    const reference = doc(this.database, this.collection, item.id.toString());
    await setDoc(reference, item, {
      merge: true,
    });
    return item;
  }
  async findAll() {
    const querySnapshot = await getDocs(
      collection(this.database, this.collection)
    );
    return querySnapshot.docs.map((doc) => doc.data());
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
