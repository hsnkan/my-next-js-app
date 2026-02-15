import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { link } from "node:fs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Koclar Mobilya",
  description: "Koclar Mobilya next app",
};

export default function RootLayout({ children }) {
  const links = [
    { link: "/", title: "Home" },
    { link: "/products", title: "Products" },
    { link: "/about", title: "About" },
    { link: "/contact", title: "Contact" },
  ];
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold">Koçlar Mobilya</h1>
        </header>
        <nav>
          <ul className="flex gap-10 p-4 bg-gray-100">
            {links.map((link) => (
              <li key={link.title}>
                <a
                  href={link.link}
                  className="text-lg font-medium text-gray-700 hover:text-gray-900"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {children}

        <div></div>
        <footer className="bg-gray-800 text-white p-4">
          <p className="text-center">
            © 2024 Koçlar Mobilya. Tüm hakları saklıdır.
          </p>
        </footer>
      </body>
    </html>
  );
}
