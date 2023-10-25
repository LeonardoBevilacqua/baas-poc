"use client";
import { createContext, useState } from "react";

export const UserContext = createContext({
  user: getUser(),
  setUser: () => {},
});

function getUser() {
    return { email: localStorage.getItem("email") ?? null };
}

export default function UserProvider({ children }) {
  const [user, setUser] = useState(getUser());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
