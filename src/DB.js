export class DB {
  constructor() {
    this.db = null;
    this.dbNamespace = null;
  }

  open(namespace, callback) {
    if (namespace != this.dbNamespace) {
      this.db = null;
    }
    this.dbNamespace = namespace;

    if (this.db) {
      callback();
      return;
    }

    let dbName = namespace == "" ? "myDatabase" : `myDatabase_${namespace}`;
    let dbReq = indexedDB.open(dbName, 2);

    dbReq.onupgradeneeded = (event) => {
      this.db = event.target.result;
      let todos;
      if (!this.db.objectStoreNames.contains("todos")) {
        this.db.createObjectStore("todos", { keyPath: "id" });
      }
    };

    dbReq.onsuccess = (event) => {
      this.db = event.target.result;
      callback();
    };
    dbReq.onerror = (event) => {
      alert("error opening database" + event.target.errorCode);
    };
  }

  addTodo(todo, callback) {
    let transaction = this.db.transaction(["todos"], "readwrite");
    let store = transaction.objectStore("todos");

    store.add(todo);

    transaction.oncomplete = () => {
      console.log("stored todo");
      this.getTodos(callback);
    };
    transaction.onerror = (event) => {
      alert("error storing todo " + event.target.error);
    };
  }

  getTodos(callback) {
    let transaction = this.db.transaction(["todos"]);
    let store = transaction.objectStore("todos");

    let todos = [];
    let request = store.openCursor();

    request.onsuccess = (event) => {
      let cursor = event.target.result;
      if (cursor) {
        todos.push(cursor.value);
        cursor.continue();
      }
      callback(todos);
    };
    request.onerror = (event) => {
      alert("error getting todos " + event.target.error);
    };
    return todos;
  }

  getTodo(id, callback) {
    let transaction = this.db.transaction(["todos"]);
    let store = transaction.objectStore("todos");

    let todo = store.get(id);

    transaction.oncomplete = () => {
      callback(todo.result);
    };
    transaction.onerror = (event) => {
      alert("error getting todos " + event.target.error);
    };
    return todo;
  }

  updateTodo(todo, callback) {
    let transaction = this.db.transaction(["todos"], "readwrite");
    let store = transaction.objectStore("todos");

    store.put(todo);

    transaction.oncomplete = () => {
      console.log("stored todo");
      this.getTodos(callback);
    };
    transaction.onerror = (event) => {
      alert("error storing todo " + event.target.error);
    };
  }

  deleteTodo(id, callback) {
    let transaction = this.db.transaction(["todos"], "readwrite");
    let store = transaction.objectStore("todos");

    store.delete(id);

    transaction.oncomplete = () => {
      console.log("deleted todo");
      this.getTodos(callback);
    };
    transaction.onerror = (event) => {
      alert("error deleting todo " + event.target.error);
    };
  }
}
