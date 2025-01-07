import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState(" ");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (param) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id == id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h[80vh] md:w-1/2">
      <h1 className="text-lg text-center font-bold text-blue-800">Todo Management</h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold my-3">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg px-2 py-2"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-700 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-6 my-3 disabled:bg-violet-700 w-1/2"
          >
            Save
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        Show Finished
        <hr></hr>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="font-bold my-4 text-green-700">
              <h4>Completed All Task</h4>
            </div>
          )}
          {todos.map((item) => {
            return ((showFinished || !item.isCompleted) &&
              <div
                key={item.id}
                className={"todo flex my-3 justify-between"}
              >
                <div className="flex gap-3">
                  <input
                    name={item.id}
                    onClick={handleCheckBox}
                    type="checkbox"
                    checked={item.isCompleted}
                    id=""
                  />
                  <div className= {item.isCompleted ? "line-through" : " "} >
                    {item.todo}
                  </div>
                </div>
              
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-yellow-700 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-red-500 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
