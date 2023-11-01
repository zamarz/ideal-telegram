import Image from "next/image";
import BookCard from "./BookCardMain";

const HomeBookList = ({ books }) => {
  return (
    <section className="w-full flex-center flex-col ">
      <div className="gap-8  border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 justify-between leading-normal">
        {books.length > 0 ? (
          <div>
            <h1 className="text-center  text-4xl font-bold tracking-wide">
              Your Book Results:
            </h1>
            <div>
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        ) : (
          <div className="place-items-center"></div>
        )}
      </div>
    </section>
  );
};

//this is the home page which will display a list of books depending on what has been searched. User can then add them to their own collection if they look good

export default HomeBookList;
