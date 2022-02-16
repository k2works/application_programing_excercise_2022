import { TodoApiService } from "./application/TodoApiService";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListModel } from "./model/TodoListModel";
import { render } from "./view/html-util";
import { TodoListView } from "./view/TodoListView";

export class App {
  constructor(params) {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
    this.service = new TodoApiService(params);
    this.messageElement = document.querySelector("#js-todo-message");
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
      onDueUpdateTodo: ({ id, dueDate }) => {
        this.handleDueUpdate({ id, dueDate });
      },
    });
    render(todoListElement, containerElement);
    this.service.count().then((count) => {
      todoItemCountElement.textContent = `Todoアイテム数: ${count}`;
    });
  }

  errorHandler(result) {
    if (result === undefined) {
      this.messageElement.textContent = "";
      return;
    }
    if (result.error) {
      this.messageElement.textContent = result.error;
    } else {
      this.messageElement.textContent = "";
    }
  }

  handleAdd(title) {
    const entity = new TodoItemModel({ title, completed: false });
    this.todoListModel.addTodo(entity);
    this.service.createTodoItem(entity).then((result) => {
      this.errorHandler(result);

      this.service.selectAll().then((todoItems) => {
        this.render(todoItems);
      });
    });
  }

  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
    const entity = new TodoItemModel({ id, title: null, completed });
    this.service.find(entity).then((result) => {
      this.errorHandler(result);

      this.service
        .save(new TodoItemModel({ id, title: result.title.value, completed }))
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
    this.service.delete(entity).then((result) => {
      this.errorHandler(result);

      this.service.selectAll().then((todoItems) => {
        this.render(todoItems);
      });
    });
  }

  handleDueUpdate({ id, dueDate }) {
    this.todoListModel.updateTodoDue({ id, dueDate });
    const entity = new TodoItemModel({ id, title: null, dueDate });
    this.service.find(entity).then((result) => {
      this.errorHandler(result);

      this.service
        .save(
          new TodoItemModel({
            id,
            title: result.title.value,
            completed: result.completed,
            dueDate,
          })
        )
        .then((result) => {
          this.errorHandler(result);

          this.service.selectAll().then((todoItems) => {
            this.render(todoItems);
          });
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
