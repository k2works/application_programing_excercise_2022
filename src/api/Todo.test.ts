import { Todo } from "./Todo";

describe("Todo", () => {
  it("挨拶する", () => {
    const todo = new Todo();
    expect(todo.greeting()).toEqual("hello world");
  });
});
