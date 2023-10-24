export class TodoInMemoryRepository {
  static _instance;
  items = [];

  /**
   * @returns {TodoInMemoryRepository}
   */
  static Instance() {
    return this._instance ? this._instance : (this._instance = new this());
  }

  async insert(item) {
    this.items.push(item);
    return item;
  }
  async findAll() {
    return this.items;
  }
  async findAllByUser(userId) {
    return this.filterByUserId(userId);
  }
  async findById(id) {
    return this.items.find((item) => item.id === id);
  }
  async existsById(id) {
    return this.items.some((item) => item.id === id);
  }
  async delete(id) {
    this.items = this.items.filter((item) => item.id !== id);
  }
  async update(item) {
    this.items = this.items.map((currentItem) =>
      currentItem.id === item.id ? item : currentItem
    );
    return item;
  }

  filterByUserId(userId) {
    return this.items.filter((item) => Number(item.userId) === Number(userId));
  }
}
