import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { nanoid } from "nanoid";

const Home = () => {
  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState([]);

  const timestamp = () => {
    const d = new Date();
    return d.toGMTString().substr(5, 20);
  };

  const formSubmitted = (e) => {
    e.preventDefault();

    setTodos([
      ...todos,
      { id: nanoid(), time: timestamp(), activity, isFinish: false },
    ]);

    console.log(todos);
    setActivity("");
  };

  return (
    <div className="container">
      <div className="wrapperHome">
        <h2>Masukkan Aktifitas</h2>
        <form onSubmit={(e) => formSubmitted(e)}>
          <input
            type="text"
            placeholder="Aktifitas"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <button type="submit" className="btnTambah">
            Tambah
          </button>
        </form>
        <h2>List Todo</h2>
        <div className="cards">
          {todos.map((todo) => {
            return (
              <div className="card" key={todo.id}>
                <label class="wrapper-checkbox">
                  <input type="checkbox" />
                  <div class="checkmark"></div>
                </label>
                <h3>{todo.activity}</h3>
                <p>{todo.isFinish ? "Sudah Selesai" : "Belum Selesai"}</p>
                <p>{todo.time}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
