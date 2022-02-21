import React from "react";

export const TodoItemView: React.FC = () => {
  return (
    <ul>
      <li className=" status not-started">
        <input type="checkbox" placeholder="check" className="checkbox" />
        a By
        <input className="due" type="date" value="" placeholder="check" />
        未着手
        <button className="delete">x</button>
      </li>
      <li className=" status not-started">
        <input type="checkbox" className="checkbox" placeholder="input" />
        b By
        <input className="due" type="date" placeholder="input" />
        未着手
        <button className="delete">x</button>
      </li>
      <li className=" status not-started">
        <input type="checkbox" className="checkbox" placeholder="input" />
        c By
        <input className="due" type="date" placeholder="input" />
        未着手
        <button className="delete">x</button>
      </li>
    </ul>
  );
};
