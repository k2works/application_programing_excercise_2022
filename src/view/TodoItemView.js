import { element } from "./html-util.js";

export class TodoItemView {
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
              <s>${todoItem.title}</s>
              <s>${todoItem.dueDate}</s>
              <button class="delete">x</button>
          </li>`
      : element`<li><input type="checkbox" class="checkbox">
             ${todoItem.title}
             <input class="dueDate" type="date" value=${todoItem.dueDate}>
             <button class="delete">x</button>
          </li>`;

    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      const completedAt = todoItem.completed ? null : new Date();

      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
        dueDate: todoItem.dueDate,
        completedAt: completedAt,
      });
    });

    const inputDueDateElement = todoItemElement.querySelector(".dueDate");
    if (inputDueDateElement) {
      inputDueDateElement.addEventListener("change", (e) => {
        onUpdateTodo({
          id: todoItem.id,
          completed: todoItem.completed,
          dueDate: e.target.value,
        });
      });
    }

    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id,
      });
    });
    return todoItemElement;
  }
}
