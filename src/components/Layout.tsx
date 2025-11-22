import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/common.css";

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="content-area">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
