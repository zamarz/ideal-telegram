"use client";
import { logIn } from "@utils/functions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loading from "./Loading";

const SignInUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loggingIn = (e) => {
    e.preventDefault();
    logIn(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="text-center py-2 space-x-4 bg-light-pink ">
      <form
        className="py-7 px-6 w-full rounded-lg h-[200px] mt-2 p-3 text-lg text-gray-500  "
        onSubmit={loggingIn}
        name="signup-form"
      >
        <p className="py-3  text-2xl font-medium">Sign in</p>
        <div className="space-y-4">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <button
            className="font-medium outline rounded px-5 py-7 my-4"
            type="submit"
            id="signup-btn"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInUser;
