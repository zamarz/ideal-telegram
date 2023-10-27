import Feed from "@components/Feed";
import Register from "@components/Register";

const Home = () => {
  return (
    <section>
      <h1>
        Discover new books with AI help
        <br />
        <span>AI-Powered Book Recommendations</span>
      </h1>
      <p>
        Use this open-source tool to search for books and add them to a wishlist
      </p>
      <Feed />
      <Register />
    </section>
  );
};

export default Home;
