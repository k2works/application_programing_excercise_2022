let todoIdx = 0;

export class TodoItemModel {
  constructor({ id, title, completed }) {
    if (id) {
      this.id = id;
    } else {
      this.id = todoIdx++;
    }
    this.title = title;
    this.completed = completed;
  }
}
