export class TodoInMemoryRepository {
  static _instance;
  items = [];
  userId;

  constructor(userId) {
    this.userId = userId;
  }

  /**
   *
   * @param {number} userId user id
   * @returns {TodoInMemoryRepository}
   */
  static Instance(userId) {
    if (this._instance) {
      this._instance.userId = userId;
      return this._instance;
    }
    return (this._instance = new this(userId));
  }

  async insert(item) {
    this.items.push(item);
    return item;
  }
  async findAll() {
    return this.filterByUserId();
  }
  async findById(id) {
    return this.filterByUserId().find((item) => item.id === id);
  }
  async existsById(id) {
    return this.filterByUserId().some((item) => item.id === id);
  }
  async delete(id) {
    if (!this.filterByUserId().length) {
      throw new NotFoundError("Item does not exists");
    }
    this.items = this.items.filter((item) => item.id !== id);
  }
  async update(item) {
    if (!this.filterByUserId().length) {
      throw new NotFoundError("Item does not exists");
    }
    this.items = this.items.map((currentItem) =>
      currentItem.id === item.id ? item : currentItem
    );
    return item;
  }

  filterByUserId() {
    return this.items.filter(
      (item) => Number(item.userId) === Number(this.userId)
    );
  }
}
