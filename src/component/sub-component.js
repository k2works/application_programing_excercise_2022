import React from "react";
import { useState } from "react";

export const SubComponent = (props) => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>{props.name}</h2>
      <div>{count}</div>
      <button onClick={handleClick}>Add +1</button>
    </div>
  );
};