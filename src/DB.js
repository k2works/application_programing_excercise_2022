import Dexie from "dexie";

export class DB extends Dexie {
  constructor(namespace) {
    super(DB.dbName(namespace));
  }

  setup() {
    return new Promise((resolve, reject) => {
      this.version(1).stores({
        todos: "++id,title,completed",
      });
      this.todos = this.table("todos");
      resolve();
    });
  }

  addTodo(todo) {
    return this.todos.add(todo);
  }

  getTodos() {
    return this.todos.orderBy("id").toArray();
  }

  getTodo(id) {
    return this.todos.get(id);
  }

  updateTodo(todo) {
    return this.todos.put(todo);
  }

  deleteTodo(id) {
    return this.todos.delete(id);
  }

  static dbName(namespace) {
    return namespace != undefined ? `my_db_${namespace}` : "my_db";
  }
}