"use client";

import { googleSignIn, logOut } from "@utils/functions";
import { useUserAuth } from "./Provider";
import Link from "next/link";

const Nav = () => {
  const user = useUserAuth();

  return (
    <nav className="flex-between w-full mb-16 pt-3 bg-pink1">
      {user.user ? (
        <div className="sm:flex hidden px-20 py-10 space-y-15 space-x-14 ml-30 place-content-center">
          <div className="flex gap-3 md:gap-5">
            <Link href="/">Home</Link>
          </div>
          <div>
            <Link href="/my-list">My Book List</Link>
          </div>
          <div>
            <p>
              {user.user.displayName ? user.user.displayName : user.user.email}{" "}
              is currently signed in
            </p>
          </div>
          <div>
            <button type="button" className="outline_btn" onClick={logOut}>
              Sign Out
            </button>
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
    </nav>
  );
};

export default Nav;
