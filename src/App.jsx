import { useState } from "react";
import Navbar from "./Navbar";

import "./App.css";
import { Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
