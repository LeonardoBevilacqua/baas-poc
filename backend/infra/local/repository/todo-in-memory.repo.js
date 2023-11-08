export class TodoInMemoryRepository {
  /**
   * @type {TodoInMemoryRepository}
   */
  static #instance;
  #items = [];
  #userId;

  /**
   * @returns {TodoInMemoryRepository}
   */
  static Instance(userId) {
    const currentInstance = this.#instance
      ? this.#instance
      : (this.#instance = new this());
    currentInstance.#userId = userId;
    return currentInstance;
  }

  async insert(item) {
    this.#items.push({
      ...item,
      id: new Date().getTime().toString(),
      completed: false,
      userId: this.#userId,
    });
    return item;
  }
  async findAll() {
    return this.#items;
  }
  async findAllByUser(userId) {
    return this.filterByUserId(userId);
  }
  async findById(id) {
    return this.#items.find((item) => item.id === id);
  }
  async existsById(id) {
    return this.#items.some((item) => item.id === id);
  }
  async delete(id) {
    this.#items = this.filterByUserId().filter((item) => item.id !== id);
  }
  async update(item) {
    this.#items = this.filterByUserId().map((currentItem) =>
      currentItem.id === item.id ? { ...currentItem, ...item } : currentItem
    );
    return item;
  }

  filterByUserId() {
    return this.#items.filter((item) => item.userId === this.#userId);
  }
}
