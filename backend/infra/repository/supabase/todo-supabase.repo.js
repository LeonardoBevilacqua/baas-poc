import { createClient } from "../../supabase/server";

export class TodoSupabaseRepository {
  static _instance;
  database;
  collection = "todo";

  constructor(cookieStore) {
    this.database = createClient(cookieStore);
  }

  /**
   * @returns {TodoFirestoreRepository}
   */
  static Instance(cookieStore) {
    return this._instance
      ? this._instance
      : (this._instance = new this(cookieStore));
  }

  async insert(item) {
    await this.database.from(this.collection).insert(item);

    return item;
  }
  async findAll() {
    const { data, error } = await this.database.from(this.collection).select();
    if (error) {
      console.log(error);
    }
    return data;
  }
  async findAllByUser(userId) {
    const { data } = await this.database
      .from(this.collection)
      .select()
      .eq("userId", userId);
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
  async delete(id, userId) {
    await this.database
      .from(this.collection)
      .delete()
      .eq("id", id)
      .eq("userId", userId);
  }
  async update(item, userId) {
    await this.database
      .from(this.collection)
      .update(item)
      .eq("id", item.id)
      .eq("userId", userId);

    return item;
  }
}
