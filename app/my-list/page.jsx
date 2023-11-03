"use client";
import BookCardUser from "@components/BookCardUser";
import { useUserAuth } from "@components/Provider";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@utils/database";
import Loading from "@components/Loading";
import Image from "next/image";

const MyBookList = () => {
  const user = useUserAuth();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBooks();
  }, []);

  const deleteBook = async (book) => {
    const hasConfirmed = confirm("Are you sure you want to delete this book?");

    if (hasConfirmed) {
      console.log(book);
      try {
        const reference = doc(db, "books", book.book_id);
        await deleteDoc(reference);
        const filteredBooks = books.filter((b) => b.book_id !== book.book_id);
        setBooks(filteredBooks).then(() => {
          const hasDeleted = confirm("Book successfully deleted!");
          console.log("Book has been deleted successfully");
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getBooks = async () => {
    const q = query(
      collection(db, "books"),
      where("user_id", "==", user.user.uid)
    );
    const querySnapshot = await getDocs(q);

    const bookData = await querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    if (bookData) {
      setLoading(false);
      return setBooks(bookData);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="w-full flex-center flex-col ">
      <h1 className="text-center  text-4xl font-bold tracking-wide">
        Your saved books
      </h1>
      <div></div>
      {books.length > 0 ? (
        <div className="  gap-8  border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 justify-between leading-normal ">
          {books.map((book) => (
            <BookCardUser
              book={book}
              key={book.book_id}
              deleteBook={() => deleteBook(book)}
            />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default MyBookList;
