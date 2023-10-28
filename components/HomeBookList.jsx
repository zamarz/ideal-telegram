import BookCard from "./BookCardMain";

const HomeBookList = ({ books }) => {
  return (
    <div>
      {books.length > 0 ? (
        <div>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div>
          <p>Your book results will be shown here</p>
        </div>
      )}
    </div>
  );
};

//this is the home page which will display a list of books depending on what has been searched. User can then add them to their own collection if they look good

export default HomeBookList;
