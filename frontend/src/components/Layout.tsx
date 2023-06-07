import Header from "./Home/Header";
import Footer from "./Home/Footer";
import { Link, Outlet } from "react-router-dom";

interface Layout {
  page: string;
}

export default function Layout({ page }: Layout) {
  return (
    <>
      <Header />
      <div className="bg-blue-800 h-[15.8rem] gap-3 text-white flex items-center justify-center flex-col">
        <h2 className="text-4xl">ACCOUNT</h2>
        <div>
          <Link className="hover:text-orange-400 hover:underline hover:underline-offset-2 transition-all" to="/">
            Home
          </Link>
          <span>/</span>
          <Link
            className="hover:text-orange-400 hover:underline hover:underline-offset-2 transition-all"
            to={`/account/${page.toLowerCase()}`}
          >
            {page}
          </Link>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
