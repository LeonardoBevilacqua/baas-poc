"use client";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: { email: null },
  setUser: () => {},
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState({ email: null });

  useEffect(() => {
    function getUser() {
      return { email: localStorage.getItem("email") ?? null };
    }
    setUser(getUser());
  }, [setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
