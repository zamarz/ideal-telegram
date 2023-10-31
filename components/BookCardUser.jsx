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
        subtitle: book.volumeInfo.subtitle || null,
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
    <div>
      <div className="outline p-5 px-6px  space-x-4  ">
        <Image
          src={
            book.bookimage === undefined
              ? "https://raw.githubusercontent.com/zamarz/ideal-telegram/f0a70526b762df20af6aa034af7505815971f8f1/public/assets/icons/bookstack.svg"
              : book.bookimage
          }
          alt="Book thumbnail"
          width={150}
          height={250}
        />
        <h2 className="text-gray-900 font-bold text-xl mb-2">{book.title}</h2>
        <h3 className="text-gray-700 text-base">{book.subtitle}</h3>
        <h3 className="text-gray-700 font-bold text-base">
          Published: {book.date}
        </h3>
        <h3>Author: {book.author === undefined ? "Unknown" : book.author}</h3>
        <p className="my-5 line-clamp-3">{book.description}</p>
        <Link
          target="_blank"
          className="inline-block bg-pink3 font-medium uppercase outline rounded-full leading-normal px-6 pb-2 pt-2.5 text-xs py-7 my-4 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          href={book.booklink}
        >
          Learn more
        </Link>
        <button
          className="inline-block bg-pink1 font-medium uppercase outline rounded-full leading-normal px-6 pb-2 pt-2.5 text-xs py-7 my-4 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={deleteBook}
        >
          Delete from list
        </button>
      </div>
    </div>
  );
};

export default BookCardUser;
