import "@styles/globals.css";
import Nav from "@components/Nav";
import UserAuthContextProvider from "@components/Provider";

export const metadata = {
  title: "AI Books",
  description: "Search for books with AI",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <UserAuthContextProvider>
          <div className="main">
            <div />
          </div>
          <main>
            <Nav />
            {children}
          </main>
        </UserAuthContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
