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
});
