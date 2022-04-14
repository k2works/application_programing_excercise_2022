import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, Todo } from "../app/Todo";
import { RootState } from "../reducers";

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
  isLoading: true,
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
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return e.response.data;
    } else {
      throw e;
    }
  }
};

const postApi = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return e.response.data;
    } else {
      throw e;
    }
  }
};

const putApi = async (url: string, data: any) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return e.response.data;
    } else {
      throw e;
    }
  }
};

const deleteApi = async (url: string, data: any) => {
  try {
    const response = await axios.delete(url, { data });
    return response.data;
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return e.response.data;
    } else {
      throw e;
    }
  }
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    readTodo(state: State, action: PayloadAction<Todo[] | any>) {
      if (action.payload.error) {
        return {
          ...state,
          message: action.payload.error,
          isError: true,
          todo: initialState.todo,
        };
      } else {
        return {
          ...state,
          todos: action.payload,
          count: action.payload.length,
          isLoading: false,
        };
      }
    },
    createTodo(state: State, action: PayloadAction<string>) {
      return {
        ...state,
        todo: { ...state.todo, id: 0, title: action.payload },
        message: "",
        isError: false,
        isLoading: false,
      };
    },
    updateTodo(state: State, action: PayloadAction<Todo>) {
      return {
        ...state,
        todo: action.payload,
        message: "",
        isError: false,
        isLoading: false,
      };
    },
    deleteTodo(state: State, action: PayloadAction<Todo>) {
      return {
        ...state,
        todo: action.payload,
        todos: initialState.todos,
        message: "",
        isError: false,
        isLoading: false,
      };
    },
  },
});

export const selectTodo = (state: RootState) => state.todo.todo;
export const selectTodos = (state: RootState) => state.todo.todos;
export const selectTodoCount = (state: RootState) => state.todo.count;
export const selectTodoMessage = (state: RootState) => state.todo.message;
export const selectIsError = (state: RootState) => state.todo.isError;
export const selectIsLoading = (state: RootState) => state.todo.isLoading;

const expand = (todos: any) =>
  todos.error
    ? todos
    : todos.value.map((item: any) => ({
        title: item.title.value,
        status: item.status.value,
        id: item.id,
        completed: item.isCompleted,
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
