import { createClient } from "../../supabase/server";

export class AdminSupabaseIdentity {
  static _instance;
  supabase;

  constructor(cookieStore) {
    this.supabase = createClient(cookieStore);
  }

  /**
   *
   * @returns {AdminAuthenticationIdentity}
   */
  static Instance(cookieStore) {
    return this._instance
      ? this._instance
      : (this._instance = new this(cookieStore));
  }

  async isUserLogged(idToken) {
    const {
      data: { user }, error
    } = await this.supabase.auth.getUser(idToken);
    if (error) {
      return false;
    }
    return !!user.id;
  }

  async getLoggedUserUid(idToken) {
    const {
      data: { user },
    } = await this.supabase.auth.getUser(idToken);
    return user.id;
  }
}
