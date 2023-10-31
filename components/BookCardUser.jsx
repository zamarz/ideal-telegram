"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@utils/database";
import { useUserAuth } from "./Provider";

const BookCardUser = ({ book, deleteBook }) => {
  const user = useUserAuth();

  //do we need this bit of code here? not adding, just viewing
  const addBook = async (e) => {
    e.preventDefault();
    //wasn't accepting description key below - doesn't load for some reason
    try {
      return await addDoc(collection(db, "books"), {
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || null,
        date: book.volumeInfo.publishedDate,
        author: book.volumeInfo.authors[0] || null,
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
    <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="outline p-6 px-6px  space-x-4  ">
        <Image
          src={
            book.bookimage === undefined
              ? "https://raw.githubusercontent.com/zamarz/ideal-telegram/f0a70526b762df20af6aa034af7505815971f8f1/public/assets/icons/bookstack.svg"
              : book.bookimage
          }
          alt="Book thumbnail"
          width={150}
          height={250}
          className="rounded-t-lg"
        />
        <h2 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {book.title}
        </h2>
        <h3 className="text-gray-700 font-bold text-base">
          Published: {book.date}
        </h3>
        <h3>Author: {book.author === undefined ? "Unknown" : book.author}</h3>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 line-clamp-3">
          {book.description}
        </p>
        <Link
          target="_blank"
          className="inline-block rounded bg-pink3 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          href={book.booklink}
        >
          Learn more
        </Link>
        <button
          className="inline-block rounded bg-pink1 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={deleteBook}
        >
          Delete from list
        </button>
      </div>
    </div>
  );
};

export default BookCardUser;
