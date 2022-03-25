import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectAllAsync } from "../features/todo/todoSlice";
import { TodoInputView } from "../components/TodoInputView";
import { TodoItemCountView } from "../components/TodoItemCountView";
import { TodoListView } from "../components/TodoListView";
import { TodoMessageView } from "../components/TodoMessageView";
import { RootState } from "../reducers";

export type Props = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  status: string;
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
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.message,
        messageType: action.messageType,
        data: action.payload,
      };
    case "FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message,
        messageType: action.messageType,
      };
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

export const Context = React.createContext({} as { state: any; dispatch: any });
export const Todo: React.FC = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });
  useTodoListApi(state.data, dispatch);
  const dispatch2 = useDispatch();
  const { todos, count, message } = useSelector(
    (state: RootState) => state.todo
  );
  useEffect(() => {
    dispatch2(selectAllAsync());
  }, [count]);

  return (
    <div>
      {state.isError && <div>Something went wrong ...</div>}
      {state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <TodoMessageView
            messageType={message.type}
            message={message.text}
          ></TodoMessageView>
          <TodoInputView></TodoInputView>
          <TodoListView data={todos}></TodoListView>
        </div>
      )}
      <TodoItemCountView count={count}></TodoItemCountView>
    </div>
  );
};
