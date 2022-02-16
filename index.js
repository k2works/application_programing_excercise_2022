import "./src/client/style.css";
import { App } from "./src/client/App.js";
import { setUp } from "./src/client/Dev.js";
import { TodoItemRepository } from "./src/client/application/TodoItemRepository";

const repository = new TodoItemRepository("todo_test", "todo_items");
repository.setup().then(() => {
  const app = new App();
  app.mount();
});
setUp();
