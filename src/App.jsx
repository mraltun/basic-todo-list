import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Alert from "./components/Alert";
import Todos from "./components/Todos";
import "./App.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter a value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "Value changed!");
    } else {
      showAlert(true, "success", "Todo added to the list");

      const newItem = { id: uuidv4(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "Todo list empty");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item removed!");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  return (
    <section className='section-center'>
      <form className='todo-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Basic Todo List</h3>

        <div className='form-control'>
          <input
            type='text'
            className='todo'
            placeholder='What are you going to do?'
            value={name}
            onChange={handleChange}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className='todo-container'>
          <Todos items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
