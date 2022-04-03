import { TodoListModel } from "./model/TodoListModel";
import { TodoItemModel } from "./model/TodoItemModel";
import { render } from "./view/html-util";
import { TodoListView } from "./view/TodoListView";
import { TodoService, Type } from "./Service";
export class App {
  constructor(db) {
    this.db = db;
    this.service = new TodoService(db);
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
  }

  handleAdd(title) {
    const messageElement = document.querySelector("#js-message");

    if (title === "") {
      return (messageElement.innerHTML = "タイトルが未入力です");
    }
    const todo = new TodoItemModel({
      title,
      completed: false,
      status: "未着手",
    });
    this.service.execute(Type.CREATE, todo).then((todos) => {
      this.todoListModel.items = todos;
      this.render();
    });
  }

  handleUpdate({ id, completed, dueDate, completedAt, status }) {
    const todo = new TodoItemModel({
      id,
      completed,
      dueDate: new Date(dueDate),
      completedAt,
      status,
    });
    this.service.execute(Type.UPDATE, todo).then((todos) => {
      this.todoListModel.items = todos;
      this.render();
    });
  }

  handleDelete({ id }) {
    this.service.execute(Type.DELETE, { id }).then((todos) => {
      this.todoListModel.items = todos;
      this.render();
    });
  }

  render() {
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    const messageElement = document.querySelector("#js-message");

    const todoItems = this.todoListModel.getTodoItems();
    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed, dueDate, completedAt, status }) => {
        this.handleUpdate({ id, completed, dueDate, completedAt, status });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    render(todoListElement, containerElement);
    todoItemCountElement.innerText = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    messageElement.innerHTML = "";
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");

    this.service.execute(Type.READ, {}).then((todos) => {
      this.todoListModel.items = todos;
      this.render();
    });

    this.todoListModel.onChange(() => {
      this.render();
    });

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleAdd(inputElement.value);
      inputElement.value = "";
    });
  }
}
