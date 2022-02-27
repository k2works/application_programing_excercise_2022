import React, { useState } from "react";
import {
  useTodoUpdateApi,
  useDeleteApi,
  Props,
  useTodoSelectAllApi,
  MessageType,
} from "../app/Todo";

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
  const [todoList, selectAll] = useTodoSelectAllApi([]);

  const dueValue = (value: any) => {
    if (value === null || value === "") {
      return "";
    } else {
      const date = new Date(value);
      return date.toISOString().substring(0, 10);
    }
  };

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsCompleted(!isCompleted);
      setTodo({ ...todo, completed: !isCompleted });
      selectAll();
      props.setMessage("Success", MessageType.success);
    } catch (error) {
      props.setMessage(error, MessageType.error);
    }
  };

  const handleChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const result = setDueDate(e.target.value);
      setTodo({ ...todo, dueDate: dueValue(e.target.value) });
      selectAll();
      props.setMessage("Success", MessageType.success);
    } catch (error) {
      props.setMessage(error, MessageType.error);
    }
  };

  const handleClickDelete = async () => {
    try {
      useDeleteApi(props.id);
      setTodo({ ...todo, id: 0 });
      selectAll();
      props.setMessage("Success", MessageType.success);
    } catch (error) {
      props.setMessage(error, MessageType.error);
    }
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
