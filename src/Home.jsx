import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { nanoid } from "nanoid";

const Home = () => {
  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem("todos");
    const initVal = JSON.parse(data);
    return initVal || [];
  });
  const [finished, setFinished] = useState([]);
  const [notFinished, setNotFinished] = useState([]);
  const [edit, setEdit] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    const finish = todos.filter((todo) => todo.isFinish === true);
    setFinished(finish);
    const notFinish = todos.filter((todo) => todo.isFinish !== true);
    setNotFinished(notFinish);
  }, [todos]);

  const timestamp = () => {
    const d = new Date();
    return `${d.toLocaleTimeString()} ${d.toDateString()}`;
  };

  const formSubmitted = (e) => {
    e.preventDefault();

    if (!activity) {
      return setMessage("Aktifitas tidak boleh kosong!");
    }

    setMessage("");

    if (edit.id) {
      const newData = {
        ...edit,
        activity,
      };

      const cloneTodos = [...todos];

      const indexTodo = cloneTodos.findIndex((todo) => todo.id === edit.id);

      cloneTodos[indexTodo] = newData;

      setTodos(cloneTodos);

      return cancelHandler();
    }

    setTodos([
      ...todos,
      { id: nanoid(), time: timestamp(), activity, isFinish: false },
    ]);

    setActivity("");
  };

  const onChecked = (data) => {
    const newTodo = {
      ...data,
      isFinish: !data.isFinish ? true : false,
    };
    const cloneTodos = [...todos];

    const indexTodo = cloneTodos.findIndex((todo) => todo.id === data.id);

    cloneTodos[indexTodo] = newTodo;
    setTodos(cloneTodos);
  };

  const editTodoHandler = (data) => {
    setActivity(data.activity);
    setEdit(data);
  };

  const deleteTodoHandler = (dataId) => {
    const cloneTodos = todos;

    const filteredData = cloneTodos.filter((todo) => todo.id !== dataId);

    setTodos(filteredData);
    setMessage("");
  };

  const cancelHandler = () => {
    setActivity("");
    setEdit({});
    setMessage("");
  };

  return (
    <div className="container">
      <div className="wrapperHome">
        <form onSubmit={(e) => formSubmitted(e)}>
          <input
            type="text"
            placeholder="Masukkan todo"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          {message && (
            <div className="warning">
              <b>{message}</b>
            </div>
          )}

          <button type="submit" className="btnTambah">
            {!edit.id ? "Tambah" : "Simpan Perubahan"}
          </button>
          {edit.id && (
            <button className="btnBatal" onClick={cancelHandler}>
              Batal
            </button>
          )}
        </form>
        <h2>Daftar Todo</h2>
        <h3>Belum Selesai</h3>
        <div className="cards">
          {notFinished.length < 1 && <i>Todo kosong...</i>}
          {notFinished.map((todo) => {
            return (
              <div className="card" key={todo.id}>
                <label className="wrapper-checkbox">
                  <input
                    type="checkbox"
                    onChange={() => onChecked(todo)}
                    checked={todo.isFinish}
                  />
                  <div className="checkmark"></div>
                </label>
                <h3>{todo.activity}</h3>
                <p>{todo.isFinish ? "Sudah Selesai" : "Belum Selesai"}</p>
                <time>{todo.time}</time>
                <button
                  className="btnEdit"
                  onClick={() => editTodoHandler(todo)}
                >
                  Edit
                </button>
                <button
                  className="btnHapus"
                  onClick={() => deleteTodoHandler(todo.id)}
                >
                  Hapus
                </button>
              </div>
            );
          })}
        </div>
        <h3>Telah Selesai</h3>
        <div className="cards">
          {finished.length < 1 && <i>Todo kosong...</i>}
          {finished.map((todo) => {
            return (
              <div className="card card-done" key={todo.id}>
                <label className="wrapper-checkbox">
                  <input
                    type="checkbox"
                    onChange={() => onChecked(todo)}
                    checked={todo.isFinish}
                  />
                  <div className="checkmark"></div>
                </label>
                <h3>{todo.activity}</h3>
                <p>{todo.isFinish ? "Sudah Selesai" : "Belum Selesai"}</p>
                <time>{todo.time}</time>
                <button
                  className="btnEdit"
                  onClick={() => editTodoHandler(todo)}
                >
                  Edit
                </button>
                <button
                  className="btnHapus"
                  onClick={() => deleteTodoHandler(todo.id)}
                >
                  Hapus
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
