import Form from "@components/Form";

const Home = () => {
  return (
    <section className="grid-rows-2">
      <h1 className="text-center  text-4xl font-bold tracking-wide">
        Discover new books with AI help
        <br className="max-md:hidden" />
      </h1>
      <p className="text-center text-3xl  py-7 ">
        Use this open-source tool powered by OpenAI to search for books and add
        them to your wishlist
      </p>
      <Form />
    </section>
  );
};

export default Home;
