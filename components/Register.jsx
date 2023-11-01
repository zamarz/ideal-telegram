"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/database";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };

  const signUp = (e) => {
    e.preventDefault();
    setError("");

    if (validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          router.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  if (error) {
    const userError = confirm(
      error + "Please enter all your information again."
    );

    if (userError) {
      setError("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="mb-12 mx-3  ">
      <form
        className="py-7 px-6 w-full rounded-lg h-[200px] mt-2 p-3 text-lg text-gray-500  "
        onSubmit={signUp}
        name="signup-form"
      >
        <p className="py-3  text-2xl font-medium">Register</p>
        <div className="space-y-4">
          <div className="relative mb-6" data-te-input-wrapper-init>
            <label htmlFor="email" className="">
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline "
            />
          </div>
          <br />

          <div className="relative mb-6">
            <label className="" htmlFor="password">
              Password{" "}
            </label>
            <input
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline "
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="relative mb-6">
            <label className="" htmlFor="confirmPassword">
              Confirm Password{" "}
            </label>
            <input
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline "
              type="password"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <br />
          <button
            className="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-pink1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            type="submit"
            id="signup-btn"
          >
            Sign Up
          </button>
          <p className="mt-6 text-center text-neutral-800 dark:text-neutral-200">
            Already have an account?
            <Link
              href="/sign-in"
              className=" underline decoration-pink1 decoration-2 decoration-double text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              {""} Sign in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
