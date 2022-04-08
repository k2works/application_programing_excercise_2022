import Dexie, { Table } from "dexie";

export class DB extends Dexie {
  private todos: any;

  constructor(namespace: string) {
    super(DB.dbName(namespace));
  }

  setup() {
    return new Promise(
      (resolve: (value?: any) => void, reject: (reason?: any) => void) => {
        this.version(1).stores({
          todos: "++id,title,completed,dueDate,createdAt, completedAt, status",
        });
        this.todos = this.table("todos");
        resolve();
      }
    );
  }

  addTodo(todo: any) {
    return this.todos.add(todo);
  }

  getTodos() {
    return this.todos.orderBy("id").toArray();
  }

  getTodo(id: number) {
    return this.todos.get(id);
  }

  updateTodo(todo: any) {
    return this.todos.put(todo);
  }

  deleteTodo(id: number) {
    return this.todos.delete(id);
  }

  static dbName(namespace: string) {
    return namespace != undefined ? `my_db_${namespace}` : "my_db";
  }
}
