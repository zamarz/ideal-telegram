import Form from "@components/Form";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="text-center  text-4xl font-bold tracking-wide">
        Discover new books with AI help
        <br className="max-md:hidden" />
        <span className="text-center text-3xl font-medium">
          AI-Powered Book Recommendations
        </span>
      </h1>
      <p className="text-center text-xl py-7 ">
        Use this open-source tool powered by OpenAI to search for books and add
        them to your wishlist
      </p>
      <Form />
    </section>
  );
};

export default Home;
