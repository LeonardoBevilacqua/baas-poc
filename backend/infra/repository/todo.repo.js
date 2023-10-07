import { TodoInMemoryRepository } from "./local/todo-in-memory.repo";

export class TodoRepository {
  static _instance;
  /**
   * @type {TodoInMemoryRepository}
   */
  repo;

  constructor(type, userId) {
    switch (type) {
      case "local":
        this.repo = TodoInMemoryRepository.Instance(userId);
        break;
      default:
        throw Error("not valid repo!");
    }
  }

  /**
   *
   * @param {number} userId user id
   * @returns {TodoInMemoryRepository}
   */
  static Instance(type, userId) {
    if (this._instance) {
      this._instance.repo.userId = userId;
      return this._instance;
    }
    return (this._instance = new this(type, userId));
  }

  async insert(item) {
    this.repo.insert(item);
  }
  async findAll() {
    return this.repo.findAll();
  }
  async findById(id) {
    return this.repo.findById(id);
  }
  async existsById(id) {
    return this.repo.existsById(id);
  }
  async delete(id) {
    this.repo.delete(id);
  }
  async update(item) {
    return this.repo.update(item);
  }
}
