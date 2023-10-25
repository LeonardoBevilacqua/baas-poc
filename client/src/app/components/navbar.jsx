"use client";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../provider/user-provider";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const { email } = user;
  return (
    <div>
      <h1>{email ? `Welcome ${email}` : "Please, login"}</h1>
      <ul>
        {email && (
          <li>
            <Link href="/api/identity/signout">Logout</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
