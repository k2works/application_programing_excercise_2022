import { DueDate, Todo } from "./Todo";

describe("Todo", () => {
  test("やることを生成する", () => {
    const todo = new Todo("タイトル");
    expect(todo.Title).toBe("タイトル");
    expect(todo.Completed).toBe(false);
  });

  test("やることを完了する", () => {
    const todo = new Todo("タイトル");
    todo.complete();
    expect(todo.Completed).toBe(true);
  });

  //TODO: エンティティとして実装する
  test.skip("内容が同じであれば同じTodo", () => {
    const todo1 = new Todo("タイトル");
    const todo2 = new Todo("タイトル");
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
    const todo = new Todo("タイトル");
    const due = new Date();
    due.setDate(due.getDate() - 1);
    const todo2 = todo.setDueDate(new DueDate(due));
    expect(todo2.overDue()).toBe(true);
  });

  test("期限が過ぎていない", () => {
    const todo = new Todo("タイトル");
    const due = new Date();
    due.setDate(due.getDate() + 1);
    const todo2 = todo.setDueDate(new DueDate(due));
    expect(todo2.overDue()).toBe(false);
  });
});
