import React from "react";

export const TodoItemComponent = (props) => {
  return (
    <li className=" status not-started">
      <input type="checkbox" placeholder="check" className="checkbox" />
      {props.title} By
      <input className="due" type="date" value="" placeholder="check" />
      {props.status}
      <button className="delete">x</button>
    </li>
  );
};
