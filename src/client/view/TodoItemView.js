import { element } from "./html-util.js";

export class TodoItemView {
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const dueValue = (value) => (value === null ? "" : value);
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
              <s>${todoItem.title.value}</s>
              <s class="due">${dueValue(todoItem.dueDate.value)}</s>
              <button class="delete">x</button>
          </li>`
      : element`<li><input type="checkbox" class="checkbox">
             ${todoItem.title.value} 
             <input class="due"
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
      onUpdateTodo({
        id: todoItem.id,
        completed: todoItem.completed,
        dueDate: e.target.value,
      });
    });
    return todoItemElement;
  }
}
