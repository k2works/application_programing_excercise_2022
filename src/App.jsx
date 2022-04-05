import React, { useEffect, useState, useReducer } from "react";
import { TodoMessageComponent } from "./component/TodoMessageComponent";
import { TodoInputComponent } from "./component/TodoInputComponent";
import { TodoItemCountComponent } from "./component/TodoItemCountComponent";
import { TodoListComponent } from "./component/TodoListComponent";
import { TodoService, Type } from "./application/TodoService";

const initialState = {
  todo: {
    id: 0,
    title: "",
    completed: false,
    dueDate: null,
    status: "",
    createdAt: null,
    completedAt: null,
  },
  todos: [],
  message: "",
  isError: false,
  service: () => {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      if (action.payload.title === "") {
        return {
          ...state,
          message: "タイトルが未入力です",
          isError: true,
          todo: initialState.todo,
        };
      }
      const newTodo = {
        title: action.payload.title,
        completed: false,
        dueDate: state.dueDate,
        status: "未着手",
        createdAt: new Date(),
      };
      return { ...state, todo: newTodo, message: "", isError: false };
    case "READ":
      return {
        ...state,
        todo: action.payload.todo,
        todos: action.payload.todos,
      };
    case "UPDATE":
      return {
        ...state,
        todo: action.payload.todo,
        message: "",
        isError: false,
      };
  }
};

const App = (props) => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const service = new TodoService(props.db);

  useEffect(() => {
    service.execute(Type.READ, {}).then((todos) => {
      setItems(todos);
    });
  }, []);

  initialState.service = service;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <TodoMessageComponent message={message} state={state} />
      <TodoInputComponent
        service={service}
        setItems={setItems}
        setMessage={setMessage}
        state={state}
        dispatch={dispatch}
      />
      <div id="js-todo-list">
        <TodoListComponent
          items={items}
          service={service}
          setItems={setItems}
          setMessage={setMessage}
          state={state}
          dispatch={dispatch}
        />
      </div>
      <footer class="footer">
        <TodoItemCountComponent count={items.length} />
      </footer>
    </div>
  );
};

export default App;
