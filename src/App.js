import { TodoApiService } from "./application/TodoApiService";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListModel } from "./model/TodoListModel";
import { render } from "./view/html-util";
import { TodoListView } from "./view/TodoListView";

export class App {
  constructor() {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
    this.service = new TodoApiService();
  }

  render(todoItems) {
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdate({ id, completed });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    render(todoListElement, containerElement);
    this.service.count().then((count) => {
      todoItemCountElement.textContent = `Todoアイテム数: ${count}`;
    });
  }

  handleAdd(title) {
    const entity = new TodoItemModel({ title, completed: false });
    this.todoListModel.addTodo(entity);
    this.service.createTodoItem(entity).then(() => {
      this.service.selectAll().then((todoItems) => {
        this.render(todoItems);
      });
    });
  }

  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
    const entity = new TodoItemModel({ id, title: null, completed });
    this.service.find(entity).then((entity) => {
      this.service
        .save(new TodoItemModel({ id, title: entity.title.value, completed }))
        .then(() => {
          this.service.selectAll().then((todoItems) => {
            this.render(todoItems);
          });
        });
    });
  }

  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
    const entity = new TodoItemModel({ id, title: null, completed: null });
    this.service.delete(entity).then(() => {
      this.service.selectAll().then((todoItems) => {
        this.render(todoItems);
      });
    });
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");

    this.service.selectAll().then((todoItems) => {
      this.render(todoItems);
    });

    this.todoListModel.onChange(() => {
      this.service.selectAll().then((todoItems) => {
        this.render(todoItems);
      });
    });

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleAdd(inputElement.value);
      inputElement.value = "";
    });
  }
}
