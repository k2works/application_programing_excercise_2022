const {
  Before,
  After,
  Given,
  Then,
} = require("cypress-cucumber-preprocessor/steps");

import { AppPage } from "../pages/appPage";

// this will get called before each scenario
let page;
Before(() => {
  page = new AppPage();
  cy.wait(1000);
});

Given(`{string} を追加する`, (value) => {
  cy.get("#js-form-input").type(`${value}{enter}`);
});

Given(`期限を設定する`, () => {
  const tomory = new Date();
  tomory.setDate(tomory.getDate() + parseInt(1));
  cy.get(".dueDate").type(`${tomory.toISOString().slice(0, 10)}`);
});

Given(`{string} を完了する`, (value) => {
  cy.get(".checkbox").click();
});

Given(`{string} を削除する`, (value) => {
  cy.get(".delete").click();
});

Then(`{string} が表示される`, (value) => {
  cy.get("#js-todo-list > ul").should("contain", `${value}`);
});

Then(`{string} が更新される`, (value) => {
  cy.get("s").should("contain", `${value}`);
});

Then(`期限が設定される`, () => {
  const tomory = new Date();
  tomory.setDate(tomory.getDate() + parseInt(1));
  cy.get(".dueDate").should(
    "have.value",
    `${tomory.toISOString().slice(0, 10)}`
  );
});

Then(`ステータスが {string} になる`, (value) => {
  cy.get("#js-todo-list > ul > li").should("contain", `${value}`);
});

Then(`{string} が削除される`, (value) => {
  cy.get("#js-todo-list > ul").should("not.contain", `${value}`);
});

Then(`アイテム数が {string} 件になる`, (value) => {
  cy.get("#js-todo-count").should("contain", value);
});