import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Team Volare",
  description: "Engineering, innovation and marine technology.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <html lang="en">
        <body>{children}</body>
      </html>
      <Contact />
      <Footer />
    </>
  );
}
