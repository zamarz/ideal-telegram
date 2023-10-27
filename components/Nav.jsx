"use client";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/database";

const Nav = () => {
  // const testUpload = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };
  return (
    <div>
      Nav
      {/* <button type="submit" onClick={testUpload}>
        Hit Me
      </button> */}
    </div>
  );
};

export default Nav;
