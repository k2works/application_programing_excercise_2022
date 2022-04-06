import React, { useState, memo, useContext } from "react";
import { AppContext, Todo } from "../app/Todo";
import { Type } from "../application/TodoService";

export const TodoItemComponent: React.VFC<{
  key: number;
  item: Todo;
}> = memo((props) => {
  const { state, dispatch } = useContext(AppContext);
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
    dispatch({
      type: "UPDATE",
      payload: { todo },
    });
    state.service.execute(Type.UPDATE, todo).then((todos: any) => {
      dispatch({ type: "READ", payload: { todo, todos } });
    });
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
    dispatch({
      type: "UPDATE",
      payload: { todo },
    });
    state.service.execute(Type.UPDATE, todo).then((todos: any) => {
      dispatch({ type: "READ", payload: { todo, todos } });
    });
  };

  const handleDeleteClick = () => {
    const id = props.item.id;
    dispatch({
      type: "DELETE",
      payload: { id },
    });
    state.service.execute(Type.DELETE, { id }).then((todos: any) => {
      dispatch({
        type: "READ",
        payload: {
          todo: {
            id: 0,
            title: "",
            completed: false,
            dueDate: null,
            status: "",
            createdAt: null,
            completedAt: null,
          },
          todos,
        },
      });
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
