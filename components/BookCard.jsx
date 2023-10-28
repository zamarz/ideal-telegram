import Image from "next/image";
import Link from "next/link";

const BookCard = ({ book }) => {
  return (
    <div>
      <div>
        <Image
          src={
            book.volumeInfo.imageLinks === undefined
              ? "./public/assets/icons/bookstack.svg"
              : book.volumeInfo.imageLinks.thumbnail
          }
          alt="Book thumbnail"
          width={200}
          height={300}
        />
        <h2>{book.volumeInfo.title}</h2>
        <h3>{book.volumeInfo.subtitle}</h3>
        <h3>Published in {book.volumeInfo.publishedDate}</h3>
        <h3>Author: {book.volumeInfo.authors[0]}</h3>
        <h4>{book.volumeInfo.desciption}</h4>
        <Link href={book.volumeInfo.infoLink}>Learn more</Link>
        <button onClick={console.log("working")}>Add to your list</button>
      </div>
    </div>
  );
};

//might be able to reuse this component on the homepage as well as the my list page

export default BookCard;
