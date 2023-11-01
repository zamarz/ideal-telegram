"use client";

import { googleSignIn, logOut } from "@utils/functions";
import { useUserAuth } from "./Provider";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Nav = () => {
  const user = useUserAuth();
  const [isOpen, setIsOpen] = useState(false);

  // className="relative flex w-full items-center justify-between bg-pink1 py-4 text-neutral-600  hover:text-neutral-700 focus:text-neutral-700 md:flex-wrap md:justify-start flex-between w-full mb-16 pt-4 px-4 font-medium space-x-6"

  return (
    <nav className="bg-pink1">
      {user.user ? (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <Image
                    src="https://raw.githubusercontent.com/zamarz/ideal-telegram/f0a70526b762df20af6aa034af7505815971f8f1/public/assets/icons/bookstack.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className="h-8 w-auto"
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <p>
                    {" "}
                    <Link href="/">Home</Link>
                  </p>
                  <p>
                    {" "}
                    <Link href="/my-list">My Book List</Link>
                  </p>
                  <button type="button" onClick={logOut}>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Profile dropdown --> */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <div>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      user.user.photoURL
                        ? user.user.photoURL
                        : "https://raw.githubusercontent.com/zamarz/ideal-telegram/f0a70526b762df20af6aa034af7505815971f8f1/public/assets/icons/bookstack.svg"
                    }
                    alt="User image"
                  />
                </div>
              </div>
            </div>
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

{
  /* <div className="sm:flex hidden px-20 py-10 space-y-15 space-x-14 ml-30 place-content-center">
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
        </div> */
}
