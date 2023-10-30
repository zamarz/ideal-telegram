"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/database";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  console.log(error);

  return (
    <div className="text-center py-2  bg-light-pink ">
      <form
        className="py-7 px-6 w-full rounded-lg h-[200px] mt-2 p-3 text-lg text-gray-500  "
        onSubmit={signUp}
        name="signup-form"
      >
        <p className="py-3  text-2xl font-medium">Register</p>
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
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <br />
        <button
          className="font-medium outline rounded px-5 py-7 my-4"
          type="submit"
          id="signup-btn"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
