import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  status: string;
};

export type State = {
  todos: Todo[];
  count: number;
};

const initialState: State = {
  todos: [],
  count: 0,
};

let baseUrl = "http://localhost:3000/api";
if (process.env.NODE_ENV === "production") {
  baseUrl = "https://ape2022.herokuapp.com/api";
}
const apiUrl = {
  selectAll: `${baseUrl}/todos`,
  create: `${baseUrl}/todo`,
  update: `${baseUrl}/todo`,
  delete: `${baseUrl}/todo`,
  count: `${baseUrl}/todos/count`,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    allTodo: (state, action: PayloadAction<Todo[]>) => {
      return { ...state, todos: action.payload };
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      const newTodo: Todo = {
        id: state.todos.length + 1,
        title: action.payload.title,
        completed: false,
        dueDate: action.payload.dueDate,
        status: "todo",
      };
      return {
        ...state,
        todos: [newTodo, ...state.todos],
        count: state.count + 1,
      };
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const newTodos = state.todos.map((todo: Todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, ...action.payload };
        }
        return todo;
      });
      return { ...state, todos: newTodos };
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const newTodos = state.todos.filter((i) => i.id !== action.payload);
      return { ...state, todos: newTodos, count: state.count - 1 };
    },
    countTodo: (state, action: PayloadAction<number>) => {
      return { ...state, todos: state.todos, count: action.payload };
    },
  },
});

export const selectAllAsync = () => async (dispatch: any) => {
  const url = apiUrl.selectAll;

  const selectAll = async () => {
    try {
      const result: any = await axios.get(url);
      const items = result.data.value.map((item: any) => ({
        title: item.title.value,
        status: item.status.value,
        id: item.id,
        completed: item.isCompleted,
        dueDate: item.dueDate.value,
      }));
      dispatch(allTodo(items));
    } catch (error) {
      throw error;
    }
  };
  await selectAll();
};

export const createAsync = (item: any) => async (dispatch: any) => {
  const url = apiUrl.create;
  const create = async () => {
    try {
      return await axios.post(url, item);
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        return e.response;
      }
    }
  };

  await create();
  dispatch(addTodo(item));
};

export const updateAsync = (item: any) => async (dispatch: any) => {
  const url = apiUrl.update;
  const update = async (todo: any) => {
    try {
      if (todo.id !== 0) {
        return await axios.put(url, todo);
      }
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        return e.response;
      }
    }
  };

  await update(item);
  dispatch(updateTodo(item));
};

export const deleteAsync = (id: number) => async (dispatch: any) => {
  const url = apiUrl.delete;
  (async () => {
    try {
      axios.delete(url, { data: { id: id } });
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        return e.response;
      }
    }
  })();

  dispatch(deleteTodo(id));
};

export const countAsync = () => async (dispatch: any) => {
  const url = apiUrl.count;
  try {
    const result = await axios.get(url);
    if (result) dispatch(countTodo(parseInt(result.data)));
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return e.response;
    }
  }
};

export const { allTodo, addTodo, updateTodo, deleteTodo, countTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
