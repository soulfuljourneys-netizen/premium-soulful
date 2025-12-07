import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/common.css";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="layout-wrapper">
      <Header />
      <div className={`content-area ${isHome ? "home" : ""}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
