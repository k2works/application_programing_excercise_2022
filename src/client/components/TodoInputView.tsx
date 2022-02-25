import React from "react";

export const TodoInputView: React.FC<{}> = () => {
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
