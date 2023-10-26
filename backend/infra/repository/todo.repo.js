import { TodoFirestoreRepository } from "./firestore/todo-firestore.repo";
import { TodoInMemoryRepository } from "./local/todo-in-memory.repo";

export class TodoRepository {
  /**
   * @type {TodoRepository}
   */
  static _instance;
  /**
   * @type {TodoInMemoryRepository | TodoFirestoreRepository}
   */
  repo;

  /**
   *
   * @param {"local"|"firestore"} type
   */
  constructor(type) {
    switch (type) {
      case "local":
        this.repo = TodoInMemoryRepository.Instance();
        break;
      case "firestore":
        this.repo = TodoFirestoreRepository.Instance();
        break;
      default:
        throw Error("not valid repo!");
    }
  }

  /**
   * @returns {TodoInMemoryRepository}
   */
  static Instance(type) {
    return this._instance ? this._instance : (this._instance = new this(type));
  }

  async insert(item) {
    this.repo.insert(item);
  }
  async findAll() {
    return this.repo.findAll();
  }
  async findAllByUser(userId) {
    return this.repo.findAllByUser(userId);
  }
  async findById(id) {
    return this.repo.findById(id);
  }
  async existsById(id) {
    return this.repo.existsById(id);
  }
  async delete(id, userId) {
    this.repo.delete(id, userId);
  }
  async update(item, userId) {
    return this.repo.update(item, userId);
  }
}
