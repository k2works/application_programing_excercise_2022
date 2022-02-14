import { Todo } from "./Todo";

export class TodoList {
  private value: Todo[];

  get Value() {
    return this.value;
  }

  constructor(value: Todo[] = []) {
    this.value = value;
  }

  add(todo: Todo): TodoList {
    return new TodoList(this.value.map((t) => t).concat(todo));
  }
}
