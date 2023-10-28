"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@utils/database";
import { useUserAuth } from "./Provider";

const BookCard = ({ book }) => {
  const [saveBook, setSaveBook] = useState({});
  //am i using this?
  const user = useUserAuth();

  const addBook = async (e) => {
    e.preventDefault();
    //wasn't accepting description below - doesn't load for some reason
    try {
      return await addDoc(collection(db, "books"), {
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle || null,
        date: book.volumeInfo.publishedDate,
        author: book.volumeInfo.authors[0],
        booklink: book.volumeInfo.infoLink,
        bookimage: book.volumeInfo.imageLinks.thumbnail || null,
        user_id: user.user.uid,
      }).then(() => {
        console.log("Book saved");
        //will need to inform user of this on frontend
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <Image
          src={
            book.volumeInfo.imageLinks === undefined
              ? "https://raw.githubusercontent.com/zamarz/ideal-telegram/f0a70526b762df20af6aa034af7505815971f8f1/public/assets/icons/bookstack.svg"
              : book.volumeInfo.imageLinks.thumbnail
          }
          alt="Book thumbnail"
          width={200}
          height={300}
        />
        <h2>{book.volumeInfo.title}</h2>
        <h3>{book.volumeInfo.subtitle}</h3>
        <h3>Published in {book.volumeInfo.publishedDate}</h3>
        <h3>Author: {book.volumeInfo.authors[0]}</h3>
        <p>{book.volumeInfo.desciption}</p>
        <Link href={book.volumeInfo.infoLink}>Learn more</Link>
        <button onClick={addBook}>Add to your list</button>
      </div>
    </div>
  );
};

//might be able to reuse this component on the homepage as well as the my list page
//description not showing for some reason

export default BookCard;
