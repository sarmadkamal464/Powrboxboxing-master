import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { getMenuItems } from "../lib/shopify";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-black text-white">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
