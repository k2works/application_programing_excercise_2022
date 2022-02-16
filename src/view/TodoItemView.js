import { element } from "./html-util.js";

export class TodoItemView {
  createElement(todoItem, { onUpdateTodo, onDeleteTodo, onDueUpdateTodo }) {
    const dueValue = (value) => {
      if (value === null) {
        return "";
      } else {
        const date = new Date(value);
        return date.toISOString().substring(0, 10);
      }
    };

    const overDue = () => (todoItem.isOverDue ? "overdue" : "");

    const statusColor = (value) => {
      if (value === "完了") {
        return "status completed";
      } else if (value === "進行中") {
        return "status in-progress";
      } else {
        return "status not-started";
      }
    };

    const todoItemElement = todoItem.isCompleted
      ? element`<li class="${overDue()} ${statusColor(
          todoItem.status.value
        )}"><input type="checkbox" class="checkbox" checked>
              <s>${todoItem.title.value}</s>
              <s class="due">${dueValue(todoItem.dueDate.value)}</s>
              ${todoItem.status.value}
              <button class="delete">x</button>
          </li>`
      : element`<li class="${overDue()} ${statusColor(
          todoItem.status.value
        )}"><input type="checkbox" class="checkbox">
             ${todoItem.title.value} 
             By
             <input class="due"
              type="date"
              placeholder="Set Due Date" 
              value=${dueValue(todoItem.dueDate.value)}>
             </input>
             ${todoItem.status.value}
             <button class="delete">x</button>
          </li>`;

    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.isCompleted,
      });
    });

    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id,
      });
    });

    const inputDueElement = todoItemElement.querySelector(".due");
    inputDueElement.addEventListener("change", (e) => {
      onDueUpdateTodo({
        id: todoItem.id,
        dueDate: e.target.value,
      });
    });
    return todoItemElement;
  }
}
