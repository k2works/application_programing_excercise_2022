import { element } from "./html-util.js";

export class TodoItemView {
  dueValue(value) {
    if (value) {
      const date = new Date(value);
      return date.toISOString().slice(0, 10);
    } else {
      return "";
    }
  }

  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
              <s>${todoItem.title}</s>
              <s>${this.dueValue(todoItem.dueDate)}</s>
              <s>${todoItem.status}</s>
              <button class="delete">x</button>
          </li>`
      : element`<li><input type="checkbox" class="checkbox">
             ${todoItem.title}
             <input class="dueDate" type="date" value=${this.dueValue(
               todoItem.dueDate
             )}>
             ${todoItem.status}
             <button class="delete">x</button>
          </li>`;

    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      const completedAt = todoItem.completed ? null : new Date();
      const status = todoItem.completed ? "着手" : "完了";

      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
        dueDate: todoItem.dueDate,
        completedAt: completedAt,
        status: status,
      });
    });

    const inputDueDateElement = todoItemElement.querySelector(".dueDate");
    if (inputDueDateElement) {
      inputDueDateElement.addEventListener("change", (e) => {
        onUpdateTodo({
          id: todoItem.id,
          completed: todoItem.completed,
          dueDate: e.target.value,
          status: "着手",
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
