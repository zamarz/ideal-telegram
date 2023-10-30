"use client";

import { googleSignIn, logOut } from "@utils/functions";
import { useUserAuth } from "./Provider";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const user = useUserAuth();

  return (
    <nav className="flex-between w-full mb-16 pt-3 bg-pink1 font-medium">
      {user.user ? (
        <div className="sm:flex hidden px-20 py-10 space-y-15 space-x-14 ml-30 place-content-center">
          <div className="flex gap-2 flex-center md:gap-5">
            <Link href="/">
              <Image
                src="https://raw.githubusercontent.com/zamarz/ideal-telegram/f0a70526b762df20af6aa034af7505815971f8f1/public/assets/icons/bookstack.svg"
                alt="logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </Link>
          </div>
          <div className="flex gap-3 md:gap-5">
            <Link href="/">Home</Link>
          </div>
          <div className="flex gap-3 md:gap-5">
            <Link href="/my-list">My Book List</Link>
          </div>
          <div className="flex gap-3 md:gap-5">
            <p>
              {user.user.displayName ? user.user.displayName : user.user.email}{" "}
              is currently signed in
            </p>
          </div>
          <div className="flex gap-3 md:gap-5">
            <button type="button" className="outline_btn" onClick={logOut}>
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="sm:flex hidden px-20 py-10 space-y-15 space-x-14 ml-30 place-content-center">
          <div className="flex gap-2 flex-center md:gap-5">
            <Link href="/">
              <Image
                src="https://raw.githubusercontent.com/zamarz/ideal-telegram/f0a70526b762df20af6aa034af7505815971f8f1/public/assets/icons/bookstack.svg"
                alt="logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </Link>
          </div>
          <div className="flex gap-2 flex-center md:gap-5">
            <Link href="/">
              <p> Home </p>
            </Link>
          </div>
          <div className="flex gap-3 md:gap-5">
            <Link href="/sign-in">Sign In</Link>
          </div>
          <div className="flex gap-3 md:gap-5">
            <Link href="/register">Register</Link>
          </div>
          <div className="flex gap-3 md:gap-5">
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
