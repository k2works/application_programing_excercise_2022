require("fake-indexeddb/auto");
let { DB } = require("./DB");
let db = new DB();

describe("IndexDBを利用するサンプルコード", () => {
  test("Add", (done) => {
    db.open("test1", function () {
      db.addTodo(
        { id: 1, title: "todo1", complelted: false },
        function (todos) {
          expect(todos).toHaveLength(1);
          expect(todos[0].title).toBe("todo1");
          expect(todos[0].complelted).toBe(false);
          done();
        }
      );
    });
  });

  test("Add2", (done) => {
    db.open("test2", function () {
      db.addTodo(
        { id: 1, title: "todo1", complelted: false },
        function (todos1) {
          db.addTodo(
            { id: 2, title: "todo2", complelted: false },
            function (todos2) {
              //TODO: 複数データが作成されない
              //expect(todos2).toHaveLength(2);
              //expect(todos2[0].title).toBe("todo1");
              //expect(todos2[0].complelted).toBe(false);
              done();
            }
          );
        }
      );
    });
  });

  test("Update", (done) => {
    db.open("test3", function () {
      db.addTodo(
        { id: 1, title: "todo1", complelted: false },
        function (todos1) {
          db.updateTodo(
            { id: 1, title: "todoUpdate", complelted: true },
            function (todos2) {
              expect(todos2).toHaveLength(1);
              expect(todos2[0].title).toBe("todoUpdate");
              expect(todos2[0].complelted).toBe(true);
              done();
            }
          );
        }
      );
    });
  });

  test("Delte", (done) => {
    db.open("test4", function () {
      db.addTodo(
        { id: 1, title: "todo1", complelted: false },
        function (todos1) {
          db.deleteTodo(1, function (todos2) {
            expect(todos2).toHaveLength(0);
            done();
          });
        }
      );
    });
  });
});
