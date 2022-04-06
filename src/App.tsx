import React, { useEffect, useReducer, createContext } from "react";
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
  count: 0,
  message: "",
  isError: false,
  service: new TodoService(null),
};

const reducer = (state: any, action: any) => {
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
        count: action.payload.todos.length,
      };
    case "UPDATE":
      return {
        ...state,
        todo: action.payload.todo,
        message: "",
        isError: false,
      };
    case "DELETE":
      return {
        ...state,
        todo: initialState.todo,
        todos: initialState.todos,
        message: "",
        isError: false,
      };
    default:
      return new Error("Unknown action type");
  }
};

export const AppContext = createContext({} as { state: any; dispatch: any });

const App = (props: any) => {
  initialState.service = new TodoService(props.db);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    state.service.execute(Type.READ, {}).then((todos: any) => {
      dispatch({ type: "READ", payload: { todo: {}, todos } });
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div>
        <TodoMessageComponent />
        <TodoInputComponent />
        <div id="js-todo-list">
          <TodoListComponent />
        </div>
        <footer className="footer">
          <TodoItemCountComponent />
        </footer>
      </div>
    </AppContext.Provider>
  );
};

export default App;
