import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAsync, deleteAsync } from "../features/todo/todoSlice";
import { Todo } from "../features/todo/todoSlice";

export const TodoItem: React.VFC<Todo> = (props) => {
  const [isCompleted, setIsCompleted] = useState(props.completed);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const item: Todo = {
    title: props.title,
    status: props.status,
    id: props.id,
    completed: isCompleted,
    dueDate: dueDate,
  };
  const dispatch = useDispatch();

  const dueValue = (value: string) => {
    if (value === null || value === "" || value === undefined) {
      return "";
    } else {
      const date = new Date(value);
      return date.toISOString().substring(0, 10);
    }
  };

  const handleChangeCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(!isCompleted);
    dispatch(updateAsync({ ...item, completed: !isCompleted }));
  };

  const handleChangeDueDate = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = dueValue(e.target.value);
    setDueDate(value);
    dispatch(updateAsync({ ...item, dueDate: value }));
  };

  const handleClickDelete = async () => {
    dispatch(deleteAsync(item.id));
  };

  const statusClassName = () => {
    if (isCompleted) {
      return "status completed";
    } else if (dueDate !== null) {
      return "status in-progress";
    } else {
      return "status not-started";
    }
  };

  const element = () => {
    if (isCompleted) {
      return (
        <li className={statusClassName()}>
          <input
            type="checkbox"
            placeholder="check"
            className="checkbox"
            checked={isCompleted}
            onChange={handleChangeCheck}
          />
          <s>{props.title}</s>
          <s className="due">{dueValue(props.dueDate)}</s>
          {props.status}
          <button className="delete" onClick={handleClickDelete}>
            x
          </button>
        </li>
      );
    } else {
      return (
        <li className={statusClassName()}>
          <input
            type="checkbox"
            placeholder="check"
            className="checkbox"
            checked={isCompleted}
            onChange={handleChangeCheck}
          />
          {props.title} By
          <input
            className="due"
            type="date"
            value={dueValue(dueDate)}
            placeholder="check"
            onChange={handleChangeDueDate}
          />
          {props.status}
          <button className="delete" onClick={handleClickDelete}>
            x
          </button>
        </li>
      );
    }
  };

  return element();
};
