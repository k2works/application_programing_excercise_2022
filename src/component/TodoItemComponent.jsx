import React from "react";

export const TodoItemComponent = () => {
  return (
    <ul>
      <li className=" status not-started">
        <input type="checkbox" placeholder="check" className="checkbox" />
        a
        <input className="due" type="date" value="" placeholder="check" />
        未着手
        <button className="delete">x</button>
      </li>
      <li className=" status not-started">
        <input type="checkbox" className="checkbox" placeholder="input" />
        b
        <input className="due" type="date" placeholder="input" />
        未着手
        <button className="delete">x</button>
      </li>
      <li className=" status not-started">
        <input type="checkbox" className="checkbox" placeholder="input" />
        c
        <input className="due" type="date" placeholder="input" />
        未着手
        <button className="delete">x</button>
      </li>
    </ul>
  );
};
