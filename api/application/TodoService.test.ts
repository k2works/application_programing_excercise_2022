import connection from "../utils/connection";
import { CompletedAt } from "../domain/CompletedAt";
import { CreatedAt } from "../domain/CreatedAt";
import { DueDate } from "../domain/DueDate";
import { Todo } from "../domain/Todo";
import { TodoService } from "./TodoService";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

describe("TodoService", () => {
  it("やることを作成する", async () => {
    const servce = new TodoService();
    const todo = new Todo("タイトル");
    await servce.create(todo);
    const result = await servce.selectAll();
    expect(result.Value[0].getTitle()).toBe("タイトル");
  });

  it("やることを更新する", async () => {
    const servce = new TodoService();
    const todo = new Todo("タイトル");
    await servce.create(todo);
    let result = await servce.selectAll();

    const id = result.Value[0].getId();
    if (id !== null) {
      const todo2 = new Todo(
        "タイトル2",
        true,
        new CreatedAt(new Date()),
        new CompletedAt(null),
        new DueDate(null),
        id
      );

      await servce.update(todo2);
      result = await servce.selectAll();
    }
    expect(result.Value[0].getTitle()).toBe("タイトル2");
  });

  it("やることを削除する", async () => {
    const servce = new TodoService();
    const todo = new Todo("タイトル");
    await servce.create(todo);
    let result = await servce.selectAll();
    await servce.delete(result.Value[0]);
    result = await servce.selectAll();
    expect(result.Value.length).toBe(0);
  });
});
