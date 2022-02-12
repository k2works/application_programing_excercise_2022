import { Todo } from "./Todo";

describe("Todo", () => {
  it("やることを生成する", () => {
    const todo = new Todo("タイトル");
    expect(todo.getTitle()).toBe("タイトル");
    expect(todo.getCompleted()).toBe(false);
  });

  it("やることを完了する", () => {
    const todo = new Todo("タイトル");
    todo.complete();
    expect(todo.getCompleted()).toBe(true);
  });

  it("内容が同じ", () => {
    const todo1 = new Todo("タイトル");
    const todo2 = new Todo("タイトル");
    expect(todo1.equals(todo2)).toBe(true);
  });
});
