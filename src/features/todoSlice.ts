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

let baseUrl = "http://localhost:3000/api";
if (process.env.NODE_ENV === "production") {
  baseUrl = "https://ape2022-take8.herokuapp.com/api";
}
const apiUrl = {
  read: `${baseUrl}/todos`,
  create: `${baseUrl}/todo`,
  update: `${baseUrl}/todo`,
  delete: `${baseUrl}/todo`,
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

const expand = (todos: any) =>
  todos.value.map((item: any) => ({
    title: item.title.value,
    status: item.status,
    id: item.id,
    completed: item.completed,
    dueDate: item.dueDate.value,
  }));

export const readTodoAsync = () => async (dispatch: any) => {
  getApi(apiUrl.read).then((todos: any) => {
    dispatch(readTodo(expand(todos)));
  });
};
export const createTodoAsync = (todo: Todo) => async (dispatch: any) => {
  postApi(apiUrl.create, todo).then((todos: any) => {
    dispatch(readTodo(expand(todos)));
  });
};
export const updateTodoAsync = (todo: Todo) => async (dispatch: any) => {
  putApi(apiUrl.update, todo).then((todos: any) => {
    dispatch(readTodo(expand(todos)));
  });
};
export const deleteTodoAsync = (todo: Todo) => async (dispatch: any) => {
  deleteApi(apiUrl.delete, todo).then((todos: any) => {
    dispatch(readTodo(expand(todos)));
  });
};

export const { createTodo, readTodo, updateTodo, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
