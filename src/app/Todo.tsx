import React, { useEffect } from "react";
import { TodoMessageComponent } from "../components/TodoMessageComponent";
import { TodoInputComponent } from "../components/TodoInputComponent";
import { TodoItemCountComponent } from "../components/TodoItemCountComponent";
import { TodoListComponent } from "../components/TodoListComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  readTodoAsync,
  selectIsError,
  selectIsLoading,
} from "../features/todoSlice";

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
  isLoading: boolean;
};

export const Todo: React.VFC<{}> = () => {
  const dispatch = useDispatch();
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(readTodoAsync());
  }, []);

  return (
    <div>
      {isError && <div>エラー</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
      )}
    </div>
  );
};
