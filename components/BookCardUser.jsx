"use client";

import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "./Provider";

const BookCardUser = ({ book, deleteBook }) => {
  const user = useUserAuth();

  return (
    <div className="mx-20 md: mt-6 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="outline p-6 px-6px space-x-4 ">
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
        <Link target="_blank" href={book.booklink}>
          <button className="bg-pink3 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded">
            {" "}
            Learn more
          </button>
        </Link>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded md: mt-6"
          onClick={deleteBook}
        >
          Delete from list
        </button>
      </div>
    </div>
  );
};

export default BookCardUser;
