import { Todo } from "./Todo";
import { AppDataSource } from "../data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

beforeEach(async () => {
  await AppDataSource.manager.clear(Todo);
});

describe("TodoEntity", () => {
  it("やることを作成する", async () => {
    const todo = new Todo();
    todo.title = "タイトル";
    todo.completed = false;
    todo.createdAt = new Date();
    todo.status = "未着手";

    await todo.save();
    expect(todo.id).toBeDefined();
    let result = await Todo.findOneBy({ id: 1 });
    if (result) {
      expect(result.title).toBe("タイトル");
      expect(result.completed).toBe(false);
    }
  });

  it("やることを更新する", async () => {
    const todo = new Todo();
    todo.title = "タイトル";
    todo.completed = false;
    todo.createdAt = new Date();
    todo.status = "未着手";

    await todo.save();
    let todo2 = await Todo.findOneBy({ id: 1 });
    if (todo2) {
      todo2.title = "タイトル2";
      await todo2.save();
      const result = await Todo.findOneBy({ id: 1 });
      if (result) expect(result.title).toBe("タイトル2");
    }
  });

  it("やることを削除する", async () => {
    const todo = new Todo();
    todo.title = "タイトル";
    todo.completed = false;
    todo.createdAt = new Date();
    todo.status = "未着手";

    await todo.save();
    await todo.remove();
    let result = await Todo.find();
    if (result) {
      result = await Todo.find();
      expect(result.length).toBe(0);
    }
  });
});
