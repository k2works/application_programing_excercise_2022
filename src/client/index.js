import "./style.css";
import { App } from "./App.js";
import { setUp } from "./Dev.js";
import { TodoItemRepository } from "./application/TodoItemRepository";

const repository = new TodoItemRepository("todo_test", "todo_items");
repository.setup().then(() => {
  const app = new App();
  app.mount();
});
setUp();
