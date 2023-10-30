"use client";

import { useState } from "react";
import HomeBookList from "./HomeBookList";
import OpenAI from "openai";

const Form = () => {
  const [books, setBooks] = useState([]);
  const [apiResults, setApiResults] = useState([]);
  const [prompt, setPrompt] = useState("");

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const main = async () => {
    const tailoredPrompt =
      prompt +
      ". Find me book recommendations based on the previous sentence. Please provide eight recommendations as an array with each recommendation in a string containing the title of the book only. If there are spaces in the string please replace them with a +. Also, ensure the string is lower case and does not include punctuation or apostrophes. Do not include n backslash anywhere. If there is no prompt then just give me random popular books instead. Lastly, make sure the books are different books.";
    console.log(tailoredPrompt);

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: tailoredPrompt }],
        model: "gpt-3.5-turbo",
      });
      setApiResults(JSON.parse(completion.choices[0].message.content));
      console.log(completion.choices[0].message.content, "message");
      console.log(apiResults, "in try in openai");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await main();
      console.log(apiResults, "apiresults 1");
    } catch (error) {
      console.log(error);
    }

    console.log(apiResults, "apiresults 2");
    try {
      console.log(apiResults, "in try statement before Promise");
      await Promise.all(
        apiResults.map(async (apiresult) => {
          const res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${apiresult}&maxResults=1&key=${process.env.NEXT_PUBLIC_FIREBASE_API}`
          );
          const booksData = await res.json();
          const { items } = booksData;
          console.log(items, "items");
          setBooks((prevBooks) => [...prevBooks, ...items]);
          console.log(books, "books");
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  //need to set state back to normal after these calls are made?

  return (
    <section>
      <div className="text-center py-2 space-x-4 ">
        <h1 className="py-3  text-2xl font-medium">
          Search for book recommendations
        </h1>
        <p className=" text-lg ">
          Simply enter a book prompt for OpenAI and you will see a list of books
          which you can then add to your book list.
        </p>

        <form
          className="py-7 px-6 w-full rounded-lg h-[200px] mt-2 p-3 text-lg text-gray-500 outline-0; "
          onSubmit={handleSubmit}
        >
          <label>
            <span className="px-7">Search here</span>
            <textarea
              className="outline text-pink4"
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Find me science fiction books..."
              required
            ></textarea>
            <br />
            <button
              type="submit"
              className="font-medium outline rounded px-5 py-7"
            >
              Get books
            </button>
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
