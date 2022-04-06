import React, { useEffect } from "react";
import { TodoMessageComponent } from "../components/TodoMessageComponent";
import { TodoInputComponent } from "../components/TodoInputComponent";
import { TodoItemCountComponent } from "../components/TodoItemCountComponent";
import { TodoListComponent } from "../components/TodoListComponent";
import { TodoService } from "../application/TodoService";
import { DB } from "../infrastructure/DB";
import { useDispatch } from "react-redux";
import { readTodoAsync } from "../features/todoSlice";

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

export const Todo: React.VFC<{ db: DB }> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readTodoAsync());
  }, []);

  return (
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
  );
};
