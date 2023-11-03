Find the hosted version here: https://ideal-telegram-9nqu-adn0gsw3t-zach-marzouks-projects.vercel.app/

I am currently working on this project.

## Tech stack and how it works

This is a project where users can search for books through the Open AI API by passing a text prompt in the search box on the main page. The result of this is run through the Google Books API which returns books that are displayed on the page. If a user is signed into their account, they're able to add a book to their list and view them on a separate page.

The project is built using React, NextJS, JS, Tailwind, and Firebase.

# Getting Started

To run this on your own local server, simply clone the repo with git clone + url and it should be saved on your system. Once you've installed the packages it comes with, run the development server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Please note, in order for it to work properly you must create your own .env file and replace the API keys in the project with your own. You'll need a Firebase project for authentication and the database (unless you modify the project for your own authentication and database needs). Lastly, you'll also need an OpenAI API key which you can obtain by signing up on the organisation's page. 

Node.js

This project was created using:
```
$ node -v | v20.2.0
```
