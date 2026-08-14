import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-neutral-950">
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </main>
  );
}
