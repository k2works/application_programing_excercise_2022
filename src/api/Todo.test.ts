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
});
