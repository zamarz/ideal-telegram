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
    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal ">
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
          className="font-medium outline rounded px-9 py-7 my-9 mx-px bg-pink3"
          href={book.booklink}
        >
          Learn more
        </Link>
        <button
          className="font-medium outline rounded px-9 py-7 my-7 bg-pink1"
          onClick={deleteBook}
        >
          Delete from list
        </button>
      </div>
    </div>
  );
};

//might be able to reuse this component on the homepage as well as the my list page
//description not showing for some reason

export default BookCardUser;
