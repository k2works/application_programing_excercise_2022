import React, { useState } from "react";
import { Type } from "../application/TodoService";

export const TodoItemComponent = (props) => {
  const [completed, setCompleted] = useState(props.completed);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const dueDateValue = (value) => {
    if (value === null || value === undefined) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    } else {
      const dueDate = date.toISOString().substring(0, 10);
      return dueDate;
    }
  };

  const handleUpdate = ({ id, completed, dueDate, completedAt, status }) => {
    const todo = {
      id,
      completed,
      dueDate,
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
      dueDate: new Date(dueDate),
      completedAt: completedAt,
      status: status,
    });
  };

  const handleDueDateCahnge = (e) => {
    const date = new Date(e.target.value);
    const dueDate = dueDateValue(e.target.value);
    setDueDate(dueDate);

    handleUpdate({
      id: props.id,
      completed: props.completed,
      dueDate: date,
      completedAt: props.completedAt,
      status: props.status,
    });
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
          <s className="dueDate">{dueDateValue(props.dueDate)}</s>
          {props.status}
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
          {props.title} By
          <input
            className="dueDate"
            type="date"
            value={dueDateValue(dueDate)}
            placeholder="check"
            onChange={handleDueDateCahnge}
          />
          {props.status}
          <button className="delete" onClick={handleDeleteClick}>
            x
          </button>
        </li>
      );
    }
  };

  return element();
};
