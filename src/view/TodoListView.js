import { element } from "./html-util";
import { TodoItemView } from "./TodoItemView";

export class TodoListView {
  createElement(todoItems, { onUpdateTodo, onDeleteTodo, onDueUpdateTodo }) {
    const todoListElement = element`<ul />`;

    todoItems.forEach((todoItem) => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {
        onDeleteTodo,
        onUpdateTodo,
        onDueUpdateTodo,
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
