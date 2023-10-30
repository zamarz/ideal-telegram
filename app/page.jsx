import Form from "@components/Form";

const Home = () => {
  return (
    <section className="my-0 mx-auto max-w-3x1 text-center">
      <h1 className="p-6 text-4x1">
        Discover new books with AI help
        <br />
        <span>AI-Powered Book Recommendations</span>
      </h1>
      <p>
        Use this open-source tool to search for books and add them to a wishlist
      </p>
      <Form />
    </section>
  );
};

export default Home;
