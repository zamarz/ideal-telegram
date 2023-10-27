"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { logIn, signUp, logOut, googleSignIn } from "../utils/functions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@utils/database";

// import { SessionProvider } from "next-auth/react";

// const Provider = ({ children, session }: any) => {
//   return <SessionProvider session={session}>{children}</SessionProvider>;
// };

// export default Provider;

const userAuthContext = createContext();

export function useUserAuth() {
  return useContext(userAuthContext);
}

const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
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
