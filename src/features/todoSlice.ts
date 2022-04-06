import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, Todo } from "../app/Todo";
import { TodoService, Type } from "../application/TodoService";
import { DB } from "../infrastructure/DB";
import { RootState } from "../reducers";

let service: TodoService;
const db = new DB("todo");
db.setup().then(() => {
  service = new TodoService(db);
});

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

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    readTodo(state: any, action: PayloadAction<Todo[]>) {
      return {
        ...state,
        todos: action.payload,
        count: action.payload.length,
      };
    },
    createTodo(state: any, action: PayloadAction<string>) {
      if (action.payload === "") {
        return {
          ...state,
          message: "タイトルが未入力です",
          isError: true,
          todo: initialState.todo,
        };
      }
      const newTodo = {
        id: 0,
        title: action.payload,
        completed: false,
        dueDate: state.todo.dueDate,
        status: "未着手",
        createdAt: new Date(),
        completedAt: null,
      };
      return { ...state, todo: newTodo, message: "", isError: false };
    },
    updateTodo(state: any, action: PayloadAction<Todo>) {
      return {
        ...state,
        todo: action.payload,
        message: "",
        isError: false,
      };
    },
    deleteTodo(state: any, action: PayloadAction<Todo>) {
      return {
        ...state,
        todo: action.payload,
        todos: initialState.todos,
        message: "",
        isError: false,
      };
    },
  },
});

export const selectTodo = (state: RootState) => state.todo.todo;
export const selectTodos = (state: RootState) => state.todo.todos;
export const selectTodoCount = (state: RootState) => state.todo.count;
export const selectTodoMessage = (state: RootState) => state.todo.message;

export const readTodoAsync = () => async (dispatch: any) => {
  service.execute(Type.READ, {}).then((todos: any) => {
    dispatch(readTodo(todos));
  });
};

export const createTodoAsync = (todo: Todo) => async (dispatch: any) => {
  service.execute(Type.CREATE, todo).then((todos: any) => {
    dispatch(readTodo(todos));
  });
};

export const updateTodoAsync = (todo: Todo) => async (dispatch: any) => {
  service.execute(Type.UPDATE, todo).then((todos: any) => {
    dispatch(readTodo(todos));
  });
};

export const deleteTodoAsync = (todo: Todo) => async (dispatch: any) => {
  service.execute(Type.DELETE, todo).then((todos: any) => {
    dispatch(readTodo(todos));
  });
};

export const { createTodo, readTodo, updateTodo, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
