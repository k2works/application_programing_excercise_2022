import React, { useState } from "react";
import { Type } from "../application/TodoService";

export const TodoItemComponent = (props) => {
  const [completed, setCompleted] = useState(props.completed);
  const [dueDate, setDueDate] = useState(props.dueDate);

  const handleUpdate = ({ id, completed, dueDate, completedAt, status }) => {
    const todo = {
      id,
      completed,
      dueDate: new Date(dueDate),
      completedAt,
      status,
    };
    props.service.execute(Type.UPDATE, todo).then((todos) => {
      props.setItems(todos);
    });
  };

  const handleDelete = ({ id }) => {
    props.service.execute(Type.DELETE, { id }).then((todos) => {
      props.setItems(todos);
    });
  };

  const handleCompletedChange = (e) => {
    setCompleted(!completed);
    const completedAt = completed ? null : new Date();
    const status = completed ? "着手" : "完了";

    handleUpdate({
      id: props.id,
      completed: !completed,
      dueDate: props.dueDate,
      completedAt: completedAt,
      status: status,
    });
  };

  const handleDueDateCahnge = (e) => {
    const date = new Date(e.target.value);
    if (Number.isNaN(date.getTime())) {
      setDueDate("");
    } else {
      setDueDate(data.toISOString().slice(0, 10));
    }
  };

  const handleDeleteClick = () => {
    handleDelete({ id: props.id });
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
          <s>{props.title}</s>
          <s className="due">{props.dueDate}</s>
          {props.status}
          <button className="delete" onClick={handleDeleteClick}>x</button>
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
          {props.title} By
          <input className="due" type="date" value="" placeholder="check" />
          {props.status}
          <button className="delete" onClick={handleDeleteClick}>x</button>
        </li>
      );
    }
  };

  return element();
};
