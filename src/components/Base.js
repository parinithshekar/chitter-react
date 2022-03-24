import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Base({ children }) {
  return (
    <>
      <Navbar />
      <div className="container is-max-desktop">
        <Outlet />
      </div>
    </>
  );
}

export default Base;
