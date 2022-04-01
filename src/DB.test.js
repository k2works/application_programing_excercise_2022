require("fake-indexeddb/auto");
let { DB } = require("./DB");
let db = new DB();

describe("IndexDBを利用するサンプルコード", () => {
  test("Add1", () => {
    db.open("test1").then(() => {
      db.addTodo({ id: 1, title: "todo1", completed: false }).then(() => {
        db.getTodos().then((todos) => {
          expect(todos).toHaveLength(1);
          expect(todos[0].title).toBe("todo1");
          expect(todos[0].complelted).toBe(false);
        });
      });
    });
  });

  test("Add2", () => {
    db.open("test2").then(() => {
      db.addTodo({ id: 1, title: "todo1", completed: false }).then(() => {
        db.addTodo({ id: 2, title: "todo2", completed: false }).then(() => {
          db.getTodos().then((todos) => {
            expect(todos).toHaveLength(2);
            expect(todos[0].title).toBe("todo1");
            expect(todos[0].complelted).toBe(false);
          });
        });
      });
    });
  });

  test("Update", () => {
    db.open("test3").then(() => {
      db.addTodo({ id: 1, title: "todo1", completed: false }).then(() => {
        db.updateTodo({ id: 1, title: "todoUpdate", completed: true }).then(
          () => {
            db.getTodos().then((todos) => {
              expect(todos).toHaveLength(1);
              expect(todos[0].title).toBe("todoUpdate");
              expect(todos[0].complelted).toBe(true);
            });
          }
        );
      });
    });
  });

  test("Delte", () => {
    db.open("test4").then(() => {
      db.addTodo({ id: 1, title: "todo1", completed: false }).then(() => {
        db.deleteTodo(1).then(() => {
          db.getTodos().then((todos) => {
            expect(todos).toHaveLength(0);
          });
        });
      });
    });
  });
});
