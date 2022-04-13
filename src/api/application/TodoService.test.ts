import { TodoService } from "./TodoService";
import { AppDataSource } from "../infrastructure/data-source";
import { TodoEntity } from "../infrastructure/entity/TodoEntity";

describe("TodoServie", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.manager.clear(TodoEntity);
  });

  test("やることを作成する", async () => {
    const servce = new TodoService();
    const params = { title: "タイトル" };
    await servce.create(params);
    const result = await servce.selectAll();
    expect(result[0].Title).toBe("タイトル");
  });

  test("やることを更新する", async () => {
    const servce = new TodoService();
    const params = { title: "タイトル" };
    await servce.create(params);
    let result = await servce.selectAll();

    const id = result[0].Id;
    const dueDate = new Date();
    if (id !== null) {
      const todo2 = {
        completed: true,
        dueDate,
        status: "着手",
        id,
      };

      await servce.update(todo2);
      result = await servce.selectAll();
    }
    expect(result[0].Completed).toBe(true);
    expect(result[0].DueDate).toEqual(dueDate);
    expect(result[0].Status).toBe("完了");
  });

  test("やることを削除する", async () => {
    const servce = new TodoService();
    const params = { title: "タイトル" };
    await servce.create(params);
    let result = await servce.selectAll();
    if (result[0].Id !== null) await servce.delete({ id: result[0].Id });
    result = await servce.selectAll();
    expect(result.length).toBe(0);
  });
});
