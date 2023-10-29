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

const MyBookList = () => {
  const user = useUserAuth();

  const [books, setBooks] = useState([]);

  //need a useEffect at the start with a function

  useEffect(() => {
    getBooks();
  }, []);
  //might need to reload books here in useEffect to deal with delete - or maybe not

  const deleteBook = async (book) => {
    const hasConfirmed = confirm("Are you sure you want to delete this book?");

    if (hasConfirmed) {
      console.log(book);
      try {
        const reference = doc(db, "books", book.book_id);
        await deleteDoc(reference);
        // The part above is not working - need to get the document reference somehow
        const filteredBooks = books.filter((b) => b.book_id !== book.book_id);
        setBooks(filteredBooks).then(() => {
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
      return setBooks(bookData);
    }
    // querySnapshot.forEach((doc) => {
    //   let bookInfo = doc.data();
    //   setBooks([...bookInfo]);
    //   console.log(doc.id, " => ", doc.data());
    // });
  };
  //not sure whether this will be an array - depends on how books come back
  //this page will hold a list of books that have been saved to a user's collection

  return (
    <section>
      <h1>Your saved books</h1>
      {books.length > 0 ? (
        <div>
          {books.map((book) => (
            <BookCardUser
              book={book}
              key={book.book_id}
              deleteBook={() => deleteBook(book)}
            />
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
