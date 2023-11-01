"use client";
import { logIn } from "@utils/functions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loading from "./Loading";
import Link from "next/link";

const SignInUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const loggingIn = (e) => {
    e.preventDefault();
    logIn(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        setError(errorMessage);
      });
  };

  if (error) {
    const userError = confirm(error + "Please enter  your information again.");

    if (userError) {
      setError("");
      setEmail("");
      setPassword("");
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mb-12 mx-3  ">
      <form
        className=" px-6 w-full rounded-lg h-[200px] text-lg text-gray-500  "
        onSubmit={loggingIn}
        name="signup-form"
      >
        <p className="text-2xl font-medium">Sign in</p>
        <div className="space-y-4">
          <div className="relative ">
            <label htmlFor="email" className="">
              Email{" "}
            </label>
            <input
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br />
          <div className="relative mb-6">
            <label htmlFor="password" className="">
              Password{" "}
            </label>
            <input
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />
          <button
            className="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-pink1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            type="submit"
            id="signup-btn"
          >
            Log In
          </button>
          <p className="mt-6 text-center text-neutral-800 dark:text-neutral-200">
            Need an account?
            <Link
              href="/register"
              className=" underline decoration-pink1 decoration-2 decoration-double text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              {""} Register here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignInUser;
