import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Element = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default Element;
