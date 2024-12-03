import { Inter } from "next/font/google";


import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "secret santa",
  description: "a simplistic secret santa for some friends",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${inter.className} overflow-x-hidden`}>
          <main className="w-screen">
            {children}
            <footer className="bg-transparent text-">
              <p>.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.</p>
              <p>made by bryan</p>
              <p>
                <a href="https://nextjs.org/" target="_blank">
                  next.js
                </a>
                {" | "}
                <a href="https://tailwindcss.com/" target="_blank">
                  tailwindcss
                </a>
                {" | "}
                <a href="https://vercel.com/" target="_blank">
                  vercel
                </a>
              </p>
              <p>
                source code available{" "}
                <a
                  href="https://github.com/brrryry/secretsanta"
                  target="_blank"
                >
                  here
                </a>
              </p>
            </footer>
          </main>
        </body>
    </html>
  );
}
