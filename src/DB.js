export class DB {
  constructor() {
    this.db = null;
    this.dbNamespace = null;
  }

  open(namespace) {
    return new Promise((resolve, reject) => {
      if (namespace != this.dbNamespace) {
        this.db = null;
      }
      this.dbNamespace = namespace;

      if (this.db) {
        resolve();
        return;
      }

      let dbName = namespace == "" ? "myDatabase" : `myDatabase_${namespace}`;
      let dbReq = indexedDB.open(dbName, 2);

      dbReq.onupgradeneeded = (event) => {
        this.db = event.target.result;
        if (!this.db.objectStoreNames.contains("todos")) {
          this.db.createObjectStore("todos", { keyPath: "id" });
        }
      };

      dbReq.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };
      dbReq.onerror = (event) => {
        reject("error opening database" + event.target.errorCode);
      };
    });
  }

  addTodo(todo) {
    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction(["todos"], "readwrite");
      let store = transaction.objectStore("todos");

      store.add(todo);

      transaction.oncomplete = () => {
        console.log("stored todo");
        resolve();
      };
      transaction.onerror = (event) => {
        reject("error storing todo " + event.target.error);
      };
    });
  }

  getTodos() {
    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction(["todos"]);
      let store = transaction.objectStore("todos");

      let todos = [];
      let request = store.openCursor();

      request.onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
          todos.push(cursor.value);
          cursor.continue();
        } else {
          resolve(todos);
        }
      };
      request.onerror = (event) => {
        reject("error getting todos " + event.target.error);
      };
    });
  }

  getTodo(id) {
    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction(["todos"]);
      let store = transaction.objectStore("todos");

      let todo = store.get(id);

      transaction.oncomplete = () => {
        resolve(todo.result);
      };
      transaction.onerror = (event) => {
        reject("error getting todos " + event.target.error);
      };
    });
  }

  updateTodo(todo) {
    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction(["todos"], "readwrite");
      let store = transaction.objectStore("todos");

      store.put(todo);

      transaction.oncomplete = () => {
        console.log("stored todo");
        resolve();
      };
      transaction.onerror = (event) => {
        reject("error storing todo " + event.target.error);
      };
    });
  }

  deleteTodo(id) {
    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction(["todos"], "readwrite");
      let store = transaction.objectStore("todos");

      store.delete(id);

      transaction.oncomplete = () => {
        console.log("deleted todo");
        resolve();
      };
      transaction.onerror = (event) => {
        reject("error deleting todo " + event.target.error);
      };
    });
  }
}
