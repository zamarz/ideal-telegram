"use client";
import { logIn } from "@utils/functions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignInUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="text-center py-2 space-x-4 bg-light-pink ">
      <form
        className="py-7 px-6 w-full rounded-lg h-[200px] mt-2 p-3 text-lg text-gray-500  "
        onSubmit={loggingIn}
        name="signup-form"
      >
        <p className="py-3  text-2xl font-medium">Log in</p>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <br />
        <button
          className="font-medium outline rounded px-5 py-7 my-4"
          type="submit"
          id="signup-btn"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignInUser;
