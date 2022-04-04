import React from "react";

export const TodoItemComponent = (props) => {
  const result = () => {
    if (props.completed) {
      return (
        <li className=" status not-started">
          <input type="checkbox" placeholder="check" className="checkbox" />
          <s>{props.title}</s>
          <s className="due">{props.dueDate}</s>
          {props.status}
          <button className="delete">x</button>
        </li>
      );
    } else {
      return (
        <li className=" status not-started">
          <input type="checkbox" placeholder="check" className="checkbox" />
          {props.title} By
          <input className="due" type="date" value="" placeholder="check" />
          {props.status}
          <button className="delete">x</button>
        </li>
      );
    }
  };

  return result();
};
