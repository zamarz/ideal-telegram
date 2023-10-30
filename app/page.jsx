import AIBookFinder from "@components/AIBookFinder";
import Form from "@components/Form";

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
      <Form />
      <AIBookFinder />
    </section>
  );
};

export default Home;
