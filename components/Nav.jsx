"use client";

import { googleSignIn, logOut } from "@utils/functions";
import { useUserAuth } from "./Provider";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const user = useUserAuth();

  return (
    <nav className="relative flex w-full items-center justify-between bg-pink1 py-4 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start flex-between w-full mb-16 pt-4 px-4 font-medium space-x-6">
      <button
        className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
        type="button"
        data-te-collapse-init
        data-te-target="#navbarSupportedContent1"
        aria-controls="navbarSupportedContent1"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="[&>svg]:w-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {user.user ? (
        <div>
          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-te-collapse-item
          >
            <div className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0">
              <Link href="/">
                <Image
                  src="https://raw.githubusercontent.com/zamarz/ideal-telegram/f0a70526b762df20af6aa034af7505815971f8f1/public/assets/icons/bookstack.svg"
                  alt="logo"
                  width={30}
                  height={30}
                  className="object-contain"
                  loading="lazy"
                />
              </Link>
            </div>
            <ul
              className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
              data-te-navbar-nav-ref
            >
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <Link href="/">Home</Link>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <Link href="/my-list">My Book List</Link>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <p>
                  {user.user.displayName
                    ? user.user.displayName
                    : user.user.email}{" "}
                  is currently signed in
                </p>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <button type="button" className="outline_btn" onClick={logOut}>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>

          {/* <div className="sm:flex hidden px-20 py-10 space-y-15 space-x-14 ml-30 place-content-center">
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
        </div> */}
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
