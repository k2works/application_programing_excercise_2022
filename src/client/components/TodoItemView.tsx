import React, { useState } from "react";
import { useTodoUpdateApi, useDeleteApi, Props } from "../app/Todo";

export const TodoItemView: React.FC<Props> = (props) => {
  const [isCompleted, setIsCompleted] = useState(props.completed);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const item = {
    title: props.title,
    status: props.status,
    id: props.id,
    completed: isCompleted,
    dueDate: dueDate,
  };
  const [todo, setTodo] = useTodoUpdateApi(item);

  const dueValue = (value: any) => {
    if (value === null || value === "") {
      return "";
    } else {
      const date = new Date(value);
      return date.toISOString().substring(0, 10);
    }
  };

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(!isCompleted);
    setTodo({ ...todo, completed: !isCompleted });
  };

  const handleChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
    setTodo({ ...todo, dueDate: dueValue(e.target.value) });
  };

  const handleClickDelete = async () => {
    useDeleteApi(props.id);
    setTodo({ ...todo, id: 0 });
  };

  const element = () => {
    if (isCompleted) {
      return (
        <li className=" status not-started">
          <input
            type="checkbox"
            placeholder="check"
            className="checkbox"
            checked={isCompleted}
            onChange={handleChangeCheck}
          />
          <s>{props.title}</s>
          <s className="due">{props.dueDate}</s>
          {props.status}
          <button className="delete" onClick={handleClickDelete}>
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
