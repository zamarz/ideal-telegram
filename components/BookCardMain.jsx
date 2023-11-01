"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@utils/database";
import { useUserAuth } from "./Provider";

const BookCardMain = ({ book }) => {
  const user = useUserAuth();
  const [toggle, setToggle] = useState(false);

  const addBook = async (e) => {
    e.preventDefault();
    try {
      return await setDoc(doc(db, "books", book.id), {
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || null,
        date: book.volumeInfo.publishedDate,
        author: book.volumeInfo.authors[0] || null,
        booklink: book.volumeInfo.infoLink,
        bookimage: book.volumeInfo.imageLinks.thumbnail || null,
        user_id: user.user.uid,
        book_id: book.id,
      }).then(() => {
        console.log("Book saved");
        setToggle(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="outline p-6 px-6px  space-x-4  ">
        <Image
          src={
            book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : "https://raw.githubusercontent.com/zamarz/ideal-telegram/f0a70526b762df20af6aa034af7505815971f8f1/public/assets/icons/bookstack.svg"
          }
          alt="Book thumbnail"
          width={200}
          height={300}
          className="rounded-t-lg"
        />
        <h2 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {book.volumeInfo.title}
        </h2>
        <h3 className="text-gray-700 font-bold text-base">
          Published in {book.volumeInfo.publishedDate}
        </h3>
        <h3>
          Author:{" "}
          {book.volumeInfo.authors[0] === undefined
            ? "Unknown"
            : book.volumeInfo.authors[0]}
        </h3>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 line-clamp-3">
          {book.volumeInfo.description}
        </p>
        <Link target="_blank" href={book.volumeInfo.infoLink}>
          <button className="bg-pink3 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded">
            {" "}
            Learn more
          </button>
        </Link>
        {user.user ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded"
            onClick={addBook}
          >
            Add to your list
          </button>
        ) : (
          <Link href={"/register"}>
            <button className="bg-pink3 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded">
              {" "}
              Register to save books
            </button>
          </Link>
        )}

        <div
          className={
            toggle
              ? "visible bg-pink4 border-t border-b border px-4 py-3"
              : "invisible bg-pink4 border-t border-b border px-4 py-3"
          }
          role="alert"
        >
          <p className="font-bold">Book added!</p>
          <p className="text-sm">
            Head to 'My Book List' to see your saved books.
          </p>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded"
            onClick={() => setToggle(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCardMain;
