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
    <div>
      <form onSubmit={loggingIn} name="signup-form">
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
        <button type="submit" id="signup-btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignInUser;
