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

    const todoItemElement = todoItem.completed
      ? element`<li class=${overDue()}><input type="checkbox" class="checkbox" checked>
              <s>${todoItem.title.value}</s>
              <s class="due">${dueValue(todoItem.dueDate.value)}</s>
              <button class="delete">x</button>
          </li>`
      : element`<li class=${overDue()}><input type="checkbox" class="checkbox">
             ${todoItem.title.value} 
             By
             <input class="due"
              type="date"
              placeholder="Set Due Date" 
              value=${dueValue(todoItem.dueDate.value)}>
             </input>
             <button class="delete">x</button>
          </li>`;

    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
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
