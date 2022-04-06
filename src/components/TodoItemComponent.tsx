import React, { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../app/Todo";
import {
  deleteTodo,
  deleteTodoAsync,
  selectTodo,
  updateTodo,
  updateTodoAsync,
} from "../features/todoSlice";

export const TodoItemComponent: React.VFC<{
  key: number;
  item: Todo;
}> = memo((props) => {
  const dispatch = useDispatch();
  const todo = useSelector(selectTodo);
  const [completed, setCompleted] = useState(props.item.completed);
  const [dueDate, setDueDate] = useState(props.item.dueDate);
  const dueDateValue = (value: any) => {
    if (value === null || value === undefined) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    } else {
      const dueDate = date.toISOString().substring(0, 10);
      return dueDate;
    }
  };

  const handleCompletedChange = () => {
    setCompleted(!completed);
    const completedAt = completed ? null : new Date();
    const status = completed ? "着手" : "完了";
    const todo = {
      id: props.item.id,
      title: props.item.title,
      completed: !completed,
      dueDate: props.item.dueDate,
      status: status,
      createdAt: props.item.createdAt,
      completedAt: completedAt,
    };
    dispatch(updateTodo(todo));
    dispatch(updateTodoAsync(todo));
  };

  const handleDueDateCahnge = (e: any) => {
    const date = new Date(e.target.value);
    setDueDate(date);
    const todo = {
      id: props.item.id,
      title: props.item.title,
      completed: props.item.completed,
      dueDate: date,
      completedAt: props.item.completedAt,
      createdAt: props.item.createdAt,
      status: props.item.status,
    };
    dispatch(updateTodo(todo));
    dispatch(updateTodoAsync(todo));
  };

  const handleDeleteClick = () => {
    const todoDelte = { ...todo, id: props.item.id };
    dispatch(deleteTodo(todoDelte));
    dispatch(deleteTodoAsync(todoDelte));
  };

  const element = () => {
    if (completed) {
      return (
        <li className=" status not-started">
          <input
            type="checkbox"
            placeholder="check"
            className="checkbox"
            onChange={handleCompletedChange}
            checked={completed}
          />
          <s>{props.item.title}</s>
          <s className="dueDate">{dueDateValue(props.item.dueDate)}</s>
          {props.item.status}
          <button className="delete" onClick={handleDeleteClick}>
            x
          </button>
        </li>
      );
    } else {
      return (
        <li className=" status not-started">
          <input
            type="checkbox"
            placeholder="check"
            className="checkbox"
            onChange={handleCompletedChange}
            checked={completed}
          />
          {props.item.title} By
          <input
            className="dueDate"
            type="date"
            value={dueDateValue(dueDate)}
            placeholder="check"
            onChange={handleDueDateCahnge}
          />
          {props.item.status}
          <button className="delete" onClick={handleDeleteClick}>
            x
          </button>
        </li>
      );
    }
  };

  return element();
});
