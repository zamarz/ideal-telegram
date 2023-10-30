import OpenAI from "openai";

const AIBookFinder = () => {
  const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

  const main = async () => {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Reccomend me some action books" }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
  };

  main();

  return <div>AIBookFinder</div>;
};

export default AIBookFinder;
