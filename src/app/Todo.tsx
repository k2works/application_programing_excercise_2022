import React, { useEffect, useReducer, createContext, Dispatch } from "react";
import { TodoMessageComponent } from "../components/TodoMessageComponent";
import { TodoInputComponent } from "../components/TodoInputComponent";
import { TodoItemCountComponent } from "../components/TodoItemCountComponent";
import { TodoListComponent } from "../components/TodoListComponent";
import { TodoService, Type } from "../application/TodoService";
import { DB } from "../infrastructure/DB";
import { useDispatch, useSelector } from "react-redux";
import { readTodo, readTodoAsync } from "../features/todoSlice";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date | null;
  status: string;
  createdAt: Date | null;
  completedAt: Date | null;
};

export type State = {
  todo: Todo;
  todos: Todo[];
  count: number;
  message: string;
  isError: boolean;
  service: TodoService;
};

const initialState: State = {
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
  service: new TodoService(new DB("todo")),
};

type Action =
  | { type: "CREATE"; payload: { title: string } }
  | { type: "READ"; payload: { todo: Todo; todos: Todo[] } }
  | { type: "UPDATE"; payload: { todo: Todo } }
  | { type: "DELETE"; payload: { id: number } };

const reducer = (state: State, action: Action): State => {
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
        id: 0,
        title: action.payload.title,
        completed: false,
        dueDate: state.todo.dueDate,
        status: "未着手",
        createdAt: new Date(),
        completedAt: null,
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
      return state;
  }
};

export const AppContext = createContext(
  {} as { state: State; dispatch: Dispatch<Action> }
);

export const Todo: React.VFC<{ db: DB }> = (props) => {
  initialState.service = new TodoService(props.db);
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatch2 = useDispatch();

  useEffect(() => {
    const todo = {
      id: 0,
      title: "",
      completed: false,
      dueDate: null,
      status: "",
      createdAt: null,
      completedAt: null,
    };
    state.service.execute(Type.READ, todo).then((todos: any) => {
      dispatch({
        type: "READ",
        payload: {
          todo,
          todos,
        },
      });
    });
    dispatch2(readTodoAsync());
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
