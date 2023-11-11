export class EmailSupaBaseIdentity {
  #supabase;

  /**
   * @param {import("@supabase/supabase-js").SupabaseClient<any, "public", any>} client
   */
  constructor(client) {
    this.#supabase = client;
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
