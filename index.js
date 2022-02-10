import "./src/style.css";
import { App } from "./src/App.js";
import { setUp } from "./src/Dev.js";
import { TodoItemRepository } from "./src/application/TodoItemRepository";

const repository = new TodoItemRepository("todo_test", "todo_items");
repository.setup().then(() => {
  const app = new App();
  app.mount();
});
setUp();