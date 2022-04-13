import { CompletedAt } from "./CompletedAt";
import { CreatedAt } from "./CreatedAt";
import { DueDate } from "./DueDate";
import { Todo } from "./Todo";
import { TodoList } from "./TodoList";

describe("Todo", () => {
  describe("正常系", () => {
    test("やることを生成する", () => {
      const todo = new Todo("タイトル");
      expect(todo.Title).toBe("タイトル");
      expect(todo.Completed).toBe(false);
    });

    test("やることを完了する", () => {
      const todo = new Todo("タイトル");
      const result = todo.complete();
      expect(result.Completed).toBe(true);
    });

    test("内容が同じであれば同じTodo", () => {
      const today = new Date();
      const todo1 = new Todo(
        "タイトル",
        false,
        new CreatedAt(today),
        new CompletedAt(null),
        new DueDate(null),
        "着手",
        1
      );
      const todo2 = new Todo(
        "タイトル",
        false,
        new CreatedAt(today),
        new CompletedAt(null),
        new DueDate(null),
        "着手",
        1
      );
      expect(todo1.equals(todo2)).toBe(true);
    });

    test("やることを生成したら開始日を設定する", () => {
      const todo = new Todo("タイトル");
      expect(todo.CreatedAt).toBeDefined();
    });

    test("やることを更新したら完了日を設定する", () => {
      const todo = new Todo("タイトル");
      todo.complete();
      expect(todo.CompletedAt).toBeDefined();
    });

    test("やることに期限を設定する", () => {
      const todo = new Todo("タイトル");
      const todo2 = todo.setDueDate(new DueDate(new Date()));
      expect(todo2.DueDate).toBeDefined();
    });

    test("期限が過ぎている", () => {
      const today = new Date();
      let oneBeforeDay = new Date();
      let twoBeforeDay = new Date();
      oneBeforeDay.setDate(today.getDate() - 1);
      twoBeforeDay.setDate(today.getDate() - 2);
      const todo = new Todo(
        "タイトル",
        false,
        new CreatedAt(twoBeforeDay),
        new CompletedAt(null),
        new DueDate(null)
      );
      const todo2 = todo.setDueDate(new DueDate(oneBeforeDay));
      expect(todo2.OverDue).toBe(true);
    });

    test("期限が過ぎていない", () => {
      const todo = new Todo("タイトル");
      const due = new Date();
      due.setDate(due.getDate() + 1);
      const todo2 = todo.setDueDate(new DueDate(due));
      expect(todo2.OverDue).toBe(false);
    });

    it("開始日より前に期限を設定できない", () => {
      const todo = new Todo("タイトル");
      const due = new Date();
      due.setDate(due.getDate() - 1);
      expect(() => todo.setDueDate(new DueDate(due))).toThrow();
    });
 
    it("ステータスが未着手", () => {
      const todo = new Todo("タイトル");
      expect(todo.Status).toBe("未着手");
    });

    it("ステータスが進行中", () => {
      const todo = new Todo("タイトル");
      const todo2 = todo.setDueDate(new DueDate(new Date()));
      expect(todo2.Status).toBe("着手");
    });

    it("ステータスが完了", () => {
      const todo = new Todo("タイトル");
      const todo2 = todo.complete();
      expect(todo2.Status).toBe("完了");
    });
  });

  describe("異常系", () => {});
});

describe("TodoList", () => {
  describe("正常系", () => {
    it("やることリストを生成する", () => {
      const todo = new Todo("タイトル");
      const todo2 = new Todo("タイトル2");
      const todoList = new TodoList([todo, todo2]);
      expect(todoList.Value.length).toBe(2);
    });

    it("やることリストを追加する", () => {
      const todo = new Todo("タイトル");
      const todo2 = new Todo("タイトル2");
      const todoList = new TodoList([todo, todo2]);
      const todoList2 = todoList.add(new Todo("タイトル3"));
      expect(todoList.Value.length).toBe(2);
      expect(todoList2.Value.length).toBe(3);
    });
  });

  describe("異常系", () => {
    it("タイトルが未入力", () => {
      expect(() => new Todo("")).toThrow();
    });

    it("開始日より前に期限を設定できない", () => {
      const todo = new Todo("タイトル");
      const due = new Date();
      due.setDate(due.getDate() - 1);
      expect(() => todo.setDueDate(new DueDate(due))).toThrow();
    });
  });
});