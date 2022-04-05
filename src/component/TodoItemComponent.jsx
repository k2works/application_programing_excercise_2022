import React, { useState, memo, useContext } from "react";
import { AppContext } from "../App";
import { Type } from "../application/TodoService";

export const TodoItemComponent = memo((props) => {
  const { state, dispatch } = useContext(AppContext);
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

  const handleCompletedChange = () => {
    setCompleted(!completed);
    const completedAt = completed ? null : new Date();
    const status = completed ? "着手" : "完了";
    const todo = {
      id: props.id,
      completed: !completed,
      dueDate: props.dueDate,
      status: status,
      completedAt: completedAt,
    };
    dispatch({
      type: "UPDATE",
      payload: { todo },
    });
    state.service.execute(Type.UPDATE, todo).then((todos) => {
      dispatch({ type: "READ", payload: { todo, todos } });
    });
  };

  const handleDueDateCahnge = (e) => {
    const date = new Date(e.target.value);
    const dueDate = dueDateValue(e.target.value);
    setDueDate(dueDate);
    const todo = {
      id: props.id,
      completed: props.completed,
      dueDate: date,
      completedAt: props.completedAt,
      status: props.status,
    };
    dispatch({
      type: "UPDATE",
      payload: { todo },
    });
    state.service.execute(Type.UPDATE, todo).then((todos) => {
      dispatch({ type: "READ", payload: { todo, todos } });
    });
  };

  const handleDeleteClick = () => {
    const id = props.id;
    dispatch({
      type: "DELETE",
      payload: { id },
    });
    state.service.execute(Type.DELETE, { id }).then((todos) => {
      dispatch({ type: "READ", payload: { todo: {}, todos } });
    });
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
});
