import Navbar from "./NavbarClient";
import Footer from "./Footer";

export default function PageShell({ children }) {
  return (
    <main className="min-h-screen overflow-x-hidden bbg-[#f5f5f3] dark:bg-[#0d1719] text-neutral-950">
      {/* <Navbar /> */}
      <div className="pt-20">{children}</div>
      {/* <Footer /> */}
    </main>
  );
}
