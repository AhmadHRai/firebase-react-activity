import React, { useState, useEffect } from "react";
import { collection, addDoc,getDocs } from "firebase/firestore"; 
import {db,auth} from "../../util/firebase"

// This is just for illustrating purposes. Please don't rely on it.
const TODO_EXAMPLE = [
  {
    uid: "IOUASD0123jl??M<OP@&#",
    name: "Get Milk",
  },
  {
    uid: "IOUASD0123jl??M<OP@&#",
    name: "Get Water",
  },
  {
    uid: "IOUASD0123jl??M<OP@&#",
    name: "Finish Canvas",
  },
];

const Home = () => {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState([]);

  const getListOfTodos = async () => {
    // Write the code to get the todo list here
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
    console.log(doc.data());
    setTodos([...todos,doc.data()]);
  });
  console.log("todos")
    console.log(todos)
  };

  const addTodo = async (e) => {
    e.preventDefault();
    // Write the code to add a new todo here. Remember that it should include the uid so it can be filtered.
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        name: todo,
        uid:auth?.currentUser?.uid
      });
      setTodo("")
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    getListOfTodos();
  };

  useEffect(() => {
    getListOfTodos();
  }, []);

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Add todo
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={addTodo}>
              <div>
                <label
                  htmlFor="todo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Todo
                </label>
                <div className="mt-2">
                  <input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    id="todo"
                    name="todo"
                    type="todo"
                    autoComplete="current-todo"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add todo
                </button>
              </div>
            </form>
            <br />
            <h1>Todos</h1>
            <ul className="divide-y divide-gray-200">
              {/* The code below should be changed to get the data from the docs */}
              {todos.filter(
                (todo) => todo.uid === auth?.currentUser?.uid
              ).map((todo) => {
                return (
                  <li
                    key={todo.id}
                    className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
                  >
                    <div className="flex justify-between space-x-3">
                      <div className="min-w-0 flex-1">
                        <a href="#" className="block focus:outline-none">
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          <p className="truncate text-sm font-medium text-gray-900">
                            {todo.name}
                          </p>
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })??""}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
