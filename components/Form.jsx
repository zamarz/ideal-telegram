"use client";

import { useState } from "react";
import HomeBookList from "./HomeBookList";

const Form = () => {
  const [searchTerm, setSearchTerm] = useState("Harry Potter");
  const [books, setBooks] = useState({});
  //might be an object

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=potter&key=${process.env.NEXT_PUBLIC_FIREBASE_API}`
      );
      const booksData = await res.json();
      const { items } = booksData;
      setBooks(items);
    } catch (error) {
      console.log(error);
    }

    //query the Google API here
    //GET https://www.googleapis.com/books/v1/volumes?q=potter&key=yourAPIKey
  };

  return (
    <section>
      <div>
        <h1>Search for book recommendations</h1>
        <p>
          Simply enter a term you want to search for and you will be shown
          books. You can then add the books to your wishlist
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            <span>Search here</span>
            <textarea
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Write a search term..."
              required
            ></textarea>
            <button type="submit">Get books</button>
          </label>
        </form>
      </div>
      <div>
        <HomeBookList books={books} />
      </div>
    </section>
  );
};
//this is where users search for books throguh the Google API. The data is then passed to the Feed which might live in this
export default Form;
