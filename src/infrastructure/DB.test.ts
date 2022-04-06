require("fake-indexeddb/auto");
let { DB } = require("./DB");
let db = new DB();

describe("IndexDBを利用するサンプルコード", () => {
  test("Add1", async () => {
    const db = new DB("test1");
    await db.setup("test1");
    db.addTodo({ id: 1, title: "todo1", completed: false }).then(() => {
      db.getTodos().then((todos: any) => {
        expect(todos).toHaveLength(1);
        expect(todos[0].title).toBe("todo1");
        expect(todos[0].completed).toBe(false);
      });
    });
  });

  test("Add2", async () => {
    const db = new DB("test2");
    await db.setup();
    db.addTodo({ id: 1, title: "todo1", completed: false }).then(() => {
      db.addTodo({ id: 2, title: "todo2", completed: false }).then(() => {
        db.getTodos().then((todos: any) => {
          expect(todos).toHaveLength(2);
          expect(todos[0].title).toBe("todo1");
          expect(todos[0].completed).toBe(false);
        });
      });
    });
  });

  test("Update", async () => {
    const db = new DB("test3");
    await db.setup();
    db.addTodo({ id: 1, title: "todo1", completed: false }).then(() => {
      db.updateTodo({ id: 1, title: "todoUpdate", completed: true }).then(
        () => {
          db.getTodos().then((todos: any) => {
            expect(todos).toHaveLength(1);
            expect(todos[0].title).toBe("todoUpdate");
            expect(todos[0].completed).toBe(true);
          });
        }
      );
    });
  });

  test("Delte", async () => {
    const db = new DB("test4");
    await db.setup();
    db.addTodo({ id: 1, title: "todo1", completed: false }).then(() => {
      db.deleteTodo(1).then(() => {
        db.getTodos().then((todos: any) => {
          expect(todos).toHaveLength(0);
        });
      });
    });
  });
});
