import { useEffect, useRef, useState } from "react";
import "./CSS/Todo.css";
import Todoitems from "./Todoitems";

let count = 0;
export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = ""; //this clears input field data after todo updates
    localStorage.setItem("todos_count", count);
  };

  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      //to store in local storage
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos]);

  //solve reload issue
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todo_count");
  }, []); //executed on page reload

  return (
    <div className="todo">
      <div className="todo-header">To-Do-List</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Your Task"
          className="todo-input"
        />
        <div
          onClick={() => {
            add();
          }}
          className="todo-add-btn"
        >
          ADD
        </div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <Todoitems
              key={index}
              setTodos={setTodos}
              no={item.no}
              display={item.display}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Todo;
