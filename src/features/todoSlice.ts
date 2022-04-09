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
};

const getApi = async (url: string) => {
  const service = (
    resolve: (value?: string) => void,
    reject: (reason?: string) => void
  ) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        return resolve(json);
      })
      .catch((error) => {
        return reject(error);
      });
  };
  return new Promise(service);
};

const postApi = async (url: string, data: any) => {
  const service = (
    resolve: (value?: string) => void,
    reject: (reason?: string) => void
  ) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        return resolve(json);
      })
      .catch((error) => {
        return reject(error);
      });
  };
  return new Promise(service);
};

const putApi = async (url: string, data: any) => {
  const service = (
    resolve: (value?: string) => void,
    reject: (reason?: string) => void
  ) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        return resolve(json);
      })
      .catch((error) => {
        return reject(error);
      });
  };
  return new Promise(service);
};

const deleteApi = async (url: string, data: any) => {
  const service = (
    resolve: (value?: string) => void,
    reject: (reason?: string) => void
  ) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        return resolve(json);
      })
      .catch((error) => {
        return reject(error);
      });
  };
  return new Promise(service);
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    readTodo(state: State, action: PayloadAction<Todo[]>) {
      return {
        ...state,
        todos: action.payload,
        count: action.payload.length,
      };
    },
    createTodo(state: State, action: PayloadAction<string>) {
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
    updateTodo(state: State, action: PayloadAction<Todo>) {
      return {
        ...state,
        todo: action.payload,
        message: "",
        isError: false,
      };
    },
    deleteTodo(state: State, action: PayloadAction<Todo>) {
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
export const selectIsError = (state: RootState) => state.todo.isError;

export const readTodoAsync = () => async (dispatch: any) => {
  const url = "http://localhost:3000/api/todos";
  getApi(url).then((todos: any) => {
    dispatch(readTodo(todos));
  });
};
export const createTodoAsync = (todo: Todo) => async (dispatch: any) => {
  const url = "http://localhost:3000/api/todo";
  postApi(url, todo).then((todos: any) => {
    dispatch(readTodo(todos));
  });
};
export const updateTodoAsync = (todo: Todo) => async (dispatch: any) => {
  const url = `http://localhost:3000/api/todo`;
  putApi(url, todo).then((todos: any) => {
    dispatch(readTodo(todos));
  });
};
export const deleteTodoAsync = (todo: Todo) => async (dispatch: any) => {
  service.execute(Type.DELETE, todo).then((todos: any) => {
    dispatch(readTodo(todos));
  });
  const url = `http://localhost:3000/api/todo/`;
  deleteApi(url, todo).then((todos: any) => {
    dispatch(readTodo(todos));
  });
};

export const { createTodo, readTodo, updateTodo, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
