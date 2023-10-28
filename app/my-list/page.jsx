"use client";
import BookCard from "@components/BookCard";
import { useUserAuth } from "@components/Provider";
import { useState } from "react";

const MyBookList = () => {
  const user = useUserAuth();

  const [books, setBooks] = useState([]);
  //not sure whether this will be an array - depends on how books come back

  return (
    <div>
      <BookCard books={books} />
    </div>
  );
};

export default MyBookList;
