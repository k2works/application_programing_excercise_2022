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

export const Context = React.createContext({} as { state: any; dispatch: any });
export const Todo: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, count, message, isLoading, isError } = useSelector(
    (state: RootState) => state.todo
  );
  useEffect(() => {
    dispatch(selectAllAsync());
  }, [count]);

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
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
