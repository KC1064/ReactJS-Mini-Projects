import React, { useEffect, useState,useRef } from "react";

const ToDo = () => {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState("");
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (input !== "") {
      const newTask = {
        id: Date.now(),
        todo: input,
      };
      setTask([...task, newTask]);
      setInput("");
    }
  };

  const deleteTodo = (id) => {
    setTask(task.filter((item) => item.id !== id));
  };

  const enterEditMode = (id, text) => {
    setEditMode(true);
    setEditId(id);
    setEditTask(text);
  };

  const updateTodo = () => {
    const updatedTask = task.map((item) => {
      if (item.id === editId) {
        return { ...item, todo: editTask };
      }
      return item;  
    });
    setTask(updatedTask);
    setEditMode(false);
    setEditId(null);
    setEditTask("");
  };

  const element = useRef(null);

  useEffect(()=>{
    element.current.focus();
  },[editMode])

  return (
    <div>
      <input
      ref={element}
        type="text"
        placeholder="Add your ToDo"
        value={editMode ? editTask : input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            editMode ? updateTodo() : addTask();
          }
        }}
        onChange={(e) => (editMode ? setEditTask(e.target.value) : setInput(e.target.value))}
      />
      {editMode ? (
        <button onClick={updateTodo}>Update Task</button>
      ) : (
        <button onClick={addTask}>Add Task</button>
      )}

      <div>
        <ul>
          {task.map((ele) => (
            <li key={ele.id}>
              {ele.todo}
              <button onClick={() => deleteTodo(ele.id)}>Delete</button>
              <button onClick={() => enterEditMode(ele.id, ele.todo)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDo;
