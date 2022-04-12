import { Todo } from "./Todo";

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
});
