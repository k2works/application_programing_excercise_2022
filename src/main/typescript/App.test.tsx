import { MainComponent as Main } from "./components/main-component";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import React, { ComponentType, ReactElement } from "react";
import { configureStore, Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./reducers";

describe("App", function () {
  const makeStore = (): Store => {
    return configureStore({
      reducer: rootReducer,
    });
  };

  const wrapComponent = (
    Component: ComponentType,
    store: Store | null = null,
    props = {}
  ): ReactElement => {
    return (
      <Provider store={store || makeStore()}>
        <Component {...props} />
      </Provider>
    );
  };

  test("タイトルが表示されているか", () => {
    const { getByText } = render(wrapComponent(Main));
    screen.debug();
    expect(getByText("タスク管理アプリケーション")).toBeInTheDocument();
  });
});
