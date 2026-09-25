import "./globals.css";
import Footer from "@/components/Footer";
import NavigationTopLoader from "@/components/NavigationTopLoader";
import NavbarServer from "@/components/NavbarServer";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  title: "Team Volare",
  description: "Engineering, innovation and marine technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NavbarServer />
        <CustomCursor />
        <NavigationTopLoader />

        <main className="page-enter">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
