import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Todos = ({ items }) => {
  return (
    <div className='todo-list'>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className='todo-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button type='button' className='edit-btn'>
                <FaEdit />
              </button>
              <button type='button' className='delete-btn'>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Todos;
