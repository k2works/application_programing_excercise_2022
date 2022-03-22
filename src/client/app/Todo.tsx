import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { TodoInputView } from "../components/TodoInputView";
import { TodoItemCountView } from "../components/TodoItemCountView";
import { TodoListView } from "../components/TodoListView";
import { TodoMessageView } from "../components/TodoMessageView";

export type Props = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  status: string;
  setMessage: any;
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

export enum MessageType {
  success = "success",
  error = "error",
}

export const useTodoMessage = (message: any) => {
  const [messageState, setMessageState] = useState(message);
  const [messageType, setMessageType] = useState(MessageType.success);

  const setMessage = (message: any, type: MessageType) => {
    setMessageState(message);
    setMessageType(type);
  };

  return [messageState, messageType, setMessage];
};

const dataFetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const useTodoListApi = (initialData: any, dispatch: any) => {
  const url = apiUrl.selectAll;

  useEffect(() => {
    let didCancel = false;
    (async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result: any = await axios(url);
        const items = result.data.value.map((item: any) => ({
          title: item.title.value,
          status: item.status.value,
          id: item.id,
          completed: item.isCompleted,
          dueDate: item.dueDate.value,
        }));
        dispatch({ type: "FETCH_SUCCESS", payload: items });
      } catch (error) {
        if (!didCancel) dispatch({ type: "FETCH_FAILURE" });
      }
    })();

    return () => {
      didCancel = true;
    };
  }, []);

  return [initialData];
};

export const useTodoSelectAllApi = (initialData: any, dispatch: any) => {
  const [todoList, setTodoList] = useState(initialData);
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
      dispatch({ type: "FETCH_SUCCESS", payload: items });
      setTodoList(items);
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE" });
      console.log(error);
      throw error;
    }
  };

  return [todoList, selectAll];
};

export const useCreateApi = (item: any) => {
  const url = apiUrl.create;
  const [todo, setTodo] = useState(item);

  const create = async () => {
    try {
      return await axios.post(url, todo);
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        return e.response;
      }
    }
  };

  return [todo, setTodo, create];
};

export const useTodoUpdateApi = (item: any) => {
  const url = apiUrl.update;
  const [todo, setTodo] = useState(item);

  const update = async (todo: any) => {
    try {
      setTodo(todo);
      if (todo.id !== 0) {
        return await axios.put(url, todo);
      }
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        return e.response;
      }
    }
  };

  return [todo, setTodo, update];
};

export const useDeleteApi = (id: number) => {
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

  return [];
};

export const userCountApi = (propsCount: number) => {
  const url = apiUrl.count;
  const [count, setCount] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(url);
        if (result) setCount(parseInt(result.data));
        if (propsCount === 0) setCount(0);
      } catch (e: any) {
        if (e.response && e.response.status === 400) {
          return e.response;
        }
      }
    })();
  }, [propsCount]);

  return [count, setCount];
};

export const Context = React.createContext({} as { state: any; dispatch: any });
export const Todo: React.FC = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });
  useTodoListApi(state.data, dispatch);
  const [message, messageType, setMessage] = useTodoMessage("");

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div>
        {state.isError && <div>Something went wrong ...</div>}
        {state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <TodoMessageView
              message={message}
              messageType={messageType}
            ></TodoMessageView>
            <TodoInputView setMessage={setMessage}></TodoInputView>
            <TodoListView
              data={state.data}
              setMessage={setMessage}
            ></TodoListView>
          </div>
        )}
        <TodoItemCountView count={state.data.length}></TodoItemCountView>
      </div>
    </Context.Provider>
  );
};
