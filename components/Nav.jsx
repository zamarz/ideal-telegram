"use client";

import { googleSignIn, logOut } from "@utils/functions";
import { useUserAuth } from "./Provider";
import Link from "next/link";

const Nav = () => {
  const user = useUserAuth();

  return (
    <div>
      {user.user ? (
        <div>
          <div>
            <Link href="/">Home</Link>
          </div>
          <div>
            <Link href="/my-list">My Book List</Link>
          </div>
          <div>
            <button type="button" onClick={logOut}>
              Sign Out
            </button>
          </div>
          <div>
            <p>
              {user.user.displayName ? user.user.displayName : user.user.email}{" "}
              is currently signed in
            </p>
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
          <div>
            <button type="button" onClick={googleSignIn}>
              Google Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
