import React, { useState, useEffect } from "react";
import Alert from "./components/Alert";
import Todos from "./components/Todos";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // Display alert
    } else if (name && isEditing) {
      // Edit here
    } else {
      // Show alert
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <section className='section-center'>
      <form className='todo-form' onSubmit={handleSubmit}>
        {alert.show && <Alert />}
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
      <div className='todo-container'>
        <Todos items={list} />
        <button className='clear-btn'>Clear Items</button>
      </div>
    </section>
  );
};

export default App;
