import { createClient } from "../server";

export class EmailSupaBaseIdentity {
  /**
   * @type {EmailSupaBaseIdentity}
   */
  static #instance;
  #supabase;

  constructor(cookieStore) {
    this.#supabase = createClient(cookieStore);
  }

  /**
   *
   * @returns {EmailSupaBaseIdentity}
   */
  static Instance(cookieStore) {
    return new this(cookieStore);
  }

  async signIn(email, password) {
    const { error, data } = await this.#supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("signIn", error);
    }

    return { error, data };
  }

  async signUp(email, password) {
    const { error, data } = await this.#supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("signUp", error);
    }

    return { error, data };
  }

  async signOutUser() {
    await this.#supabase.auth.signOut();
  }

  async getLoggedUser() {
    const {
      data: { session },
      error,
    } = await this.#supabase.auth.getSession();

    if (!session) {
      return null;
    }

    if (error) {
      console.log("getLoggedUser", error);
      return null;
    }

    return session.user;
  }
}
