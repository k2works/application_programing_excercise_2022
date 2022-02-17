import { Todo } from "./Todo";

describe("Todo", () => {
  it("やることを生成する", () => {
    const todo = new Todo("タイトル");
    expect(todo.Title).toBe("タイトル");
    expect(todo.Completed).toBe(false);
  });

  it("やることを完了する", () => {
    const todo = new Todo("タイトル");
    todo.complete();
    expect(todo.Completed).toBe(true);
  });

  it("内容が同じであれば同じTodo", () => {
    const todo1 = new Todo("タイトル");
    const todo2 = new Todo("タイトル");
    expect(todo1.equals(todo2)).toBe(true);
  });

    it("やることを生成したら開始日を設定する", () => {
      const todo = new Todo("タイトル");
      expect(todo.CreatedAt).toBeDefined();
    });

    it("やることを更新したら完了日を設定する", () => {
      const todo = new Todo("タイトル");
      todo.complete();
      expect(todo.CompletedAt).toBeDefined();
    });

    it("やることに期限を設定する", () => {
      const todo = new Todo("タイトル");
      todo.DueDate = new Date();
      expect(todo.DueDate).toBeDefined();
    });

    it("やることの期限を確認する", () => {
      const todo = new Todo("タイトル");
      const due = new Date();
      due.setDate(due.getDate() - 1);
      todo.DueDate = due;
      expect(todo.overDue()).toBe(true);
    });
});
