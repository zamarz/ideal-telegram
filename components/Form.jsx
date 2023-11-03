"use client";

import { useState } from "react";
import HomeBookList from "./HomeBookList";
import OpenAI from "openai";

const Form = () => {
  const [books, setBooks] = useState([]);
  const [apiResults, setApiResults] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const main = async () => {
    const tailoredPrompt =
      prompt +
      ". Provide a JSON object of an array of eight book recommendations based on the previous sentence with a key of 'parsedBooks'. Each recommendation should be in a string containing the title of the book only. If there are spaces in each string, replace them with a '+'. String should be lower case and not include any kind of punctuation. Do not include n backslash anywhere. If the first sentence of this prompt doesn't make sense, provide eight random popular books instead. Also make sure each book in the array is a different book. This is an example of the format I'm looking for: '{ 'parsedBooks': ['wind+in+the+willows', 'winnie+the+pooh', 'charlottes+web', 'mother+goose', 'the+twits', 'elmer', 'the_rainbow_fish', 'spot']}'";

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: tailoredPrompt }],
        model: "gpt-3.5-turbo",
      });
      console.log(completion.choices[0].message.content);
      console.log(typeof completion.choices[0].message.content);
      let message = completion.choices[0].message.content;
      let parsedMessage = await JSON.parse(message);

      let { parsedBooks } = await parsedMessage;
      console.log(parsedBooks, "parsedBooks");
      return parsedBooks;

      // setApiResults(parsedBooks);
    } catch (error) {
      console.log(error);
      console.error("Error fetching message content");
    }
  };

  //change to using then statements

  const createNewBooks = async () => {
    const newBooks = await main();
    setApiResults(newBooks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingButton(true);

    try {
      await createNewBooks();
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
      setLoadingButton(false);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  //need to set state back to normal after these calls are made?

  return (
    <section>
      <div className="text-center py-2 space-x-4 bg-light-pink pb-9">
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
            <span className="px-7 ">Search here:</span>
            <textarea
              className="outline px-8 py-3 "
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Find me science fiction books..."
              required
            ></textarea>
            <br />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded md: mt-6"
            >
              Get books
            </button>
            {loadingButton ? (
              <div
                className="px-9 py-5 text-lg inline-block h-8 w-8 animate-bounce "
                role="status"
              >
                <p className="">Finding your books...</p>
              </div>
            ) : (
              <div></div>
            )}
          </label>
        </form>
      </div>
      <div>
        <HomeBookList books={books} />
      </div>
    </section>
  );
};
export default Form;
