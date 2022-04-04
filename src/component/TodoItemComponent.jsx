import React from "react";

export const TodoItemComponent = () => {
  const li1 = (
    <li className=" status not-started">
      <input type="checkbox" placeholder="check" className="checkbox" />
      a By
      <input className="due" type="date" value="" placeholder="check" />
      未着手
      <button className="delete">x</button>
    </li>
  );

  const li2 = (
    <li className=" status not-started">
      <input type="checkbox" className="checkbox" placeholder="input" />
      b By
      <input className="due" type="date" placeholder="input" />
      未着手
      <button className="delete">x</button>
    </li>
  );

  const li3 = (
    <li className=" status not-started">
      <input type="checkbox" className="checkbox" placeholder="input" />
      c By
      <input className="due" type="date" placeholder="input" />
      未着手
      <button className="delete">x</button>
    </li>
  );

  const list = [li1, li2, li3];

  return <ul>{list.map((li, index) => li)}</ul>;
};
