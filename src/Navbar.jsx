import React from "react";
import "./App.css";

import reactImg from "./assets/react.svg";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="navbarTitle">
          <img src={reactImg} alt="" />
          <h1>Todo List</h1>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
