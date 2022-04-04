import React from "react";

export const TodoInputComponent = () => {
  return (
    <form id="js-form">
      <input
        id="js-form-input"
        type="text"
        placeholder="What need to be done?"
        autoComplete="off"
      />
    </form>
  );
};
