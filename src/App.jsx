import React, { useState, useEffect } from "react";
import Alert from "./components/Alert";
import Todos from "./components/Todos";

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted!");
  };

  return (
    <section className='section-center'>
      <form className='todo-form' onSubmit={handleSubmit}>
        {alert.show && <Alert />}
      </form>
      <div className='todo-container'>
        <Todos />
        <button className='clear-btn'>Clear Items</button>
      </div>
    </section>
  );
};

export default App;
