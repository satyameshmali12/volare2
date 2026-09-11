import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import NavigationTopLoader from "@/components/NavigationTopLoader";
// import { useState } from "react";

export const metadata = {
  title: "Team Volare",
  description: "Engineering, innovation and marine technology.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <html lang="en" style={{ marginTop: "20px" }}>
        <body>
          <NavigationTopLoader />
          {children}
        </body>
      </html>

      <Footer />
    </>
  );
}
