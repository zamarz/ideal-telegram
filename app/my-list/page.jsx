"use client";
import BookCard from "@components/BookCard";
import { useUserAuth } from "@components/Provider";
import { useState } from "react";

const MyBookList = () => {
  const user = useUserAuth();

  const [books, setBooks] = useState([]);
  //not sure whether this will be an array - depends on how books come back
  //this page will hold a list of books that have been saved to a user's collection

  return (
    <div>
      <BookCard books={books} />
    </div>
  );
};

export default MyBookList;
