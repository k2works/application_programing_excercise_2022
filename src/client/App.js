import { TodoApiService } from "./application/TodoApiService";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListModel } from "./model/TodoListModel";
import { render } from "./view/html-util";
import { TodoListView } from "./view/TodoListView";

export class App {
  constructor(apiUrl) {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
    this.service = new TodoApiService(apiUrl);
  }

  render(todoItems) {
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed, dueDate }) => {
        this.handleUpdate({ id, completed, dueDate });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    render(todoListElement, containerElement);
    this.service
      .count()
      .then((count) => {
        todoItemCountElement.textContent = `Todoアイテム数: ${count}`;
      })
      .catch((error) => this.handleMessage(error));
  }

  handleMessage(message) {
    const messageElement = document.querySelector("#js-message");
    messageElement.classList.remove(
      "message",
      "error",
      "success",
      "system-error"
    );
    if (message.error) {
      messageElement.classList.add("message", "error");
      messageElement.textContent = message.error;
    } else if (message.success) {
      messageElement.classList.add("message", "success");
      messageElement.textContent = message.success;
    } else {
      if (message.toString().includes("TypeError")) {
        messageElement.classList.add("message", "system-error");
      } else {
        messageElement.classList.add("message");
      }
      messageElement.textContent = message;
    }
  }

  handleAdd(title) {
    const entity = new TodoItemModel({ title, completed: false });
    this.todoListModel.addTodo(entity);
    this.service
      .createTodoItem(entity)
      .then((result) => {
        this.handleMessage(result);
        this.service.selectAll().then((todoItems) => {
          this.render(todoItems);
        });
      })
      .catch((error) => this.handleMessage(error));
  }

  handleUpdate({ id, completed, dueDate }) {
    this.todoListModel.updateTodo({ id, completed, dueDate });
    const entity = new TodoItemModel({ id, title: null, completed, dueDate });
    this.service
      .find(entity)
      .then((result) => {
        this.service
          .save(
            new TodoItemModel({
              id,
              title: result.title.value,
              completed,
              dueDate,
            })
          )
          .then((result) => {
            this.handleMessage(result);
            this.service.selectAll().then((todoItems) => {
              this.render(todoItems);
            });
          })
          .catch((error) => this.handleMessage(error));
      })
      .catch((error) => this.handleMessage(error));
  }

  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
    const entity = new TodoItemModel({ id, title: null, completed: null });
    this.service
      .delete(entity)
      .then((result) => {
        this.handleMessage(result);
        this.service.selectAll().then((todoItems) => {
          this.render(todoItems);
        });
      })
      .catch((error) => this.handleMessage(error));
  }

  mount() {
    this.handleMessage("...");
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    this.service
      .selectAll()
      .then((todoItems) => {
        this.handleMessage("");
        this.render(todoItems);
      })
      .catch((error) => this.handleMessage(error));

    this.todoListModel.onChange(() => {
      this.service
        .selectAll()
        .then((todoItems) => {
          this.handleMessage("");
          this.render(todoItems);
        })
        .catch((error) => this.handleMessage(error));
    });

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleAdd(inputElement.value);
      inputElement.value = "";
    });
  }
}
