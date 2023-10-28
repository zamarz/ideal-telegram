"use client";
import BookCardUser from "@components/BookCardUser";
import { useUserAuth } from "@components/Provider";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@utils/database";

const MyBookList = () => {
  const user = useUserAuth();

  const [books, setBooks] = useState([]);

  //need a useEffect at the start with a function

  useEffect(() => {
    getBooks();
  }, []);

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
      return setBooks(bookData);
    }
    // querySnapshot.forEach((doc) => {
    //   let bookInfo = doc.data();
    //   setBooks([...bookInfo]);
    //   console.log(doc.id, " => ", doc.data());
    // });
  };

  console.log(books);
  //not sure whether this will be an array - depends on how books come back
  //this page will hold a list of books that have been saved to a user's collection

  return (
    <section>
      {books.length > 0 ? (
        <div>
          {books.map((book) => (
            <BookCardUser book={book} key={book.book_id} />
          ))}
        </div>
      ) : (
        <div>
          <p>
            Your books will appear here once you have added them to your list
          </p>
        </div>
      )}
    </section>
  );
};

export default MyBookList;
