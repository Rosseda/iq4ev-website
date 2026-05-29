import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Navbar />}

      <Outlet />

      {!isHomePage && <Footer />}
    </>
  );
}