import { TodoService } from "./application/TodoService";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListModel } from "./model/TodoListModel";
import { render } from "./view/html-util";
import { TodoListView } from "./view/TodoListView";

export class App {
  constructor() {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
    this.service = new TodoService();
  }

  handleAdd(title) {
    const model = new TodoItemModel({ title, completed: false });
    this.todoListModel.addTodo(model);
    this.service.createTodoItem(model);
  }

  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
    const entity = new TodoItemModel({ id, completed });
    this.service.find(entity).then((entity) => {
      this.service.save(
        new TodoItemModel({ id, title: entity.title, completed })
      );
    });
  }

  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
    const entity = new TodoItemModel({ id });
    this.service.delete(entity);
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    this.todoListModel.onChange(() => {
      this.service.selectAll().then((todoItems) => {
        const todoListElement = this.todoListView.createElement(todoItems, {
          onUpdateTodo: ({ id, completed }) => {
            this.handleUpdate({ id, completed });
          },
          onDeleteTodo: ({ id }) => {
            this.handleDelete({ id });
          },
        });
        render(todoListElement, containerElement);
        todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
      });
    });

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleAdd(inputElement.value);
      inputElement.value = "";
    });
  }
}
