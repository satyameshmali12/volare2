import "./globals.css";
import Footer from "@/components/Footer";
import NavigationTopLoader from "@/components/NavigationTopLoader";
import NavbarServer from "@/components/NavbarServer";
// import { useState } from "react";

export const metadata = {
  title: "Team Volare",
  description: "Engineering, innovation and marine technology.",
};

export default async function RootLayout({ children }) {
  return (
    <>
      <NavbarServer />
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
