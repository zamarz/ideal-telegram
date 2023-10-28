"use client";

import { logOut } from "@utils/functions";
import { useUserAuth } from "./Provider";
import Link from "next/link";

const Nav = () => {
  const user = useUserAuth();

  return (
    <div>
      {user.user ? (
        <div>
          <div>
            <Link href="/create-prompt">Create prompt</Link>
          </div>
          <div>
            <Link href="/my-list">My List</Link>
          </div>
          <div>
            <button type="button" onClick={logOut}>
              Sign Out
            </button>
          </div>
          <div>
            <p>{user.user.email} is currently signed in</p>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Link href="/sign-in">Sign In</Link>
          </div>
          <div>
            <Link href="/register">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
