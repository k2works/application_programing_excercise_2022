import { CompletedAt } from "./CompletedAt";
import { CreatedAt } from "./CreatedAt";
import { DueDate } from "./DueDate";
import { Todo } from "./Todo";
import { TodoList } from "./TodoList";

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

  it("やることを生成したら開始日を設定する", () => {
    const todo = new Todo("タイトル");
    expect(todo.getCreatedAt()).toBeDefined();
  });

  it("やることを更新したら完了日を設定する", () => {
    const todo = new Todo("タイトル");
    todo.complete();
    expect(todo.getCompletedAt()).toBeDefined();
  });

  it("やることに期限を設定する", () => {
    const todo = new Todo("タイトル");
    const todo2 = todo.setDueDate(new DueDate(new Date()));
    expect(todo2.getDueDate()).toBeDefined();
  });

  it("期限が過ぎている", () => {
    const today = new Date();
    const oneBeforeDay = new Date(today.getDate() - 1);
    const twoBeforeDay = new Date(today.getDate() - 2);
    const todo = new Todo(
      "タイトル",
      false,
      new CreatedAt(twoBeforeDay),
      new CompletedAt(null),
      new DueDate(null)
    );
    const todo2 = todo.setDueDate(new DueDate(oneBeforeDay));
    expect(todo2.overDue()).toBe(true);
  });

  it("期限が過ぎていない", () => {
    const todo = new Todo("タイトル");
    const due = new Date();
    due.setDate(due.getDate() + 1);
    const todo2 = todo.setDueDate(new DueDate(due));
    expect(todo2.overDue()).toBe(false);
  });

  it("開始日より前に期限を設定できない", () => {
    const todo = new Todo("タイトル");
    const due = new Date();
    due.setDate(due.getDate() - 1);
    expect(() => todo.setDueDate(new DueDate(due))).toThrow();
  });

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
