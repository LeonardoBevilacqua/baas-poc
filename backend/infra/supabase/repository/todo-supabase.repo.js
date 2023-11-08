import { createClient } from "../server";

export class TodoSupabaseRepository {
  /**
   * @type {TodoSupabaseRepository}
   */
  static #instance;
  #database;
  #collection = "todo";

  constructor(cookieStore) {
    this.#database = createClient(cookieStore);
  }

  /**
   * @returns {TodoSupabaseRepository}
   */
  static Instance(cookieStore) {
    return this.#instance
      ? this.#instance
      : (this.#instance = new this(cookieStore));
  }

  async insert(item) {
    const { error } = await this.#database.from(this.#collection).insert(item);
    if (error) {
      console.log("insert", error);
    }

    return item;
  }
  async findAll() {
    const { data, error } = await this.#database
      .from(this.#collection)
      .select();
    if (error) {
      console.log("findAll", error);
    }
    return data;
  }
  async findAllByUser(userId) {
    const { data } = await this.#database
      .from(this.#collection)
      .select()
      .eq("user_id", userId);
    return data;
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
    await this.#database.from(this.#collection).delete().eq("id", id);
  }
  async update(item) {
    const { error } = await this.#database
      .from(this.#collection)
      .update(item)
      .eq("id", item.id);
    if (error) {
      console.log("update", error);
    }

    return item;
  }
}
