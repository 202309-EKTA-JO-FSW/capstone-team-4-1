import { Inter } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FoodDrop",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
