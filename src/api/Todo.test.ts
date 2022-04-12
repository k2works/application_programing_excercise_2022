import { Todo } from "./Todo";

describe("Todo", () => {
  test("内容が同じであれば同じTodo", () => {
    const todo1 = new Todo("タイトル");
    const todo2 = new Todo("タイトル");
    expect(todo1.equals(todo2)).toBe(true);
  });

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
