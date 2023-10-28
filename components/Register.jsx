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
    <div>
      <form onSubmit={signUp} name="signup-form">
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
        <input
          type="password"
          id="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <br />
        <button type="submit" id="signup-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
