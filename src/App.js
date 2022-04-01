import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListModel } from "./model/TodoListModel";
import { render } from "./view/html-util";
import { TodoListView } from "./view/TodoListView";
export class App {
  constructor(db) {
    this.db = db;
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
  }

  handleAdd(title) {
    const todo = new TodoItemModel({ title, completed: false });
    this.db.addTodo(new TodoItemModel(todo)).then(() => {
      this.db.getTodos().then((todos) => {
        this.todoListModel.items = todos;
        this.render();
      });
    });
  }

  handleUpdate({ id, completed }) {
    this.db.getTodo(id).then((todo) => {
      todo.completed = completed;
      this.db.updateTodo(todo).then(() => {
        this.db.getTodos().then((todos) => {
          this.todoListModel.items = todos;
          this.render();
        });
      });
    });
  }

  handleDelete({ id }) {
    this.db.deleteTodo(id).then(() => {
      this.db.getTodos().then((todos) => {
        this.todoListModel.items = todos;
        this.render();
      });
    });
  }

  render() {
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    const todoItems = this.todoListModel.getTodoItems();
    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdate({ id, completed });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    render(todoListElement, containerElement);
    todoItemCountElement.innerText = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");

    this.db.getTodos().then((todos) => {
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
