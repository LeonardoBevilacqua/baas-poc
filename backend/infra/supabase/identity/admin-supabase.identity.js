import { createClient } from "../server";

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
      data: { user },
      error,
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

  async getUserSession() {
    const {
      data: { session },
      error,
    } = await this.supabase.auth.getSession();

    if (!session) {
      return null;
    }

    if (error) {
      console.log(error);
      return null;
    }

    return session.user;
  }
}
