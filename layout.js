import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Nelervarburada | Semtinin Cevherlerini Keşfet",
  description: "Semtindeki en iyi ustalar, öğretmenler ve profesyoneller burada.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}