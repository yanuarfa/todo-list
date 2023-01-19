import { useState } from "react";
import Navbar from "./Navbar";

import "./App.css";
import { Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
