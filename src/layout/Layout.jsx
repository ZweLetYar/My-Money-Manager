import React from "react";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="mx-7 overflow-y-hidden h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
