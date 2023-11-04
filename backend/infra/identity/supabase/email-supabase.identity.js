import { createClient } from "../../supabase/server";

export class EmailSupaBaseIdentity {
  static _instance;
  supabase;

  constructor(cookieStore) {
    this.supabase = createClient(cookieStore);
  }

  /**
   *
   * @returns {EmailSupaBaseIdentity}
   */
  static Instance(cookieStore) {
    return this._instance
      ? this._instance
      : (this._instance = new this(cookieStore));
  }

  async signIn(email, password) {
    const { error, data } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return {
      result: {
        user: {
          getIdToken: () => {
            return data.session.access_token;
          },
          email,
        },
      },
      error,
    };
  }

  async signUp(email, password) {
    const { error, data } = await this.supabase.auth.signUp({
      email,
      password,
    });
    return {
      result: {
        user: {
          getIdToken: async () => {
            return data.session.access_token;
          },
          email,
        },
      },
      error,
    };
  }

  async signOutUser() {
    await this.supabase.auth.signOut();
  }
}
