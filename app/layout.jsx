import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "My record collection",
  description:
    "A sample of my record collection based on the information in Discogs' API ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div class="">
          <Navbar />
          {children}

          <footer class="border-t border-gray-300 pt-2">
            <p className="text-sm text-center pt-2">
              My fallow-week project built with NextJS, Tailwind CSS, and the
              Discogs API.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
