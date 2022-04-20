import { Main } from "./component/MainComponent";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";

describe("App", function () {
  test("タイトルが表示されているか", () => {
    const { getByText } = render(<Main />);
    screen.debug();
    expect(getByText("Hello React!")).toBeInTheDocument();
  });
});
