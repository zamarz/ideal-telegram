"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { logIn, signUp, logOut, googleSignIn } from "../utils/functions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@utils/database";

const userAuthContext = createContext();

export function useUserAuth() {
  return useContext(userAuthContext);
}

const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userLoggedIn = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    return () => {
      userLoggedIn();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
