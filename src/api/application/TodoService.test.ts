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

  describe("正常系", () => {
    test("やることを作成する", async () => {
      const servce = new TodoService();
      const params = { title: "タイトル" };
      await servce.create(params);
      const result = await servce.selectAll();
      expect(result.Value[0].Title).toBe("タイトル");
    });

    test("やることを更新する", async () => {
      const servce = new TodoService();
      const params = { title: "タイトル" };
      await servce.create(params);
      let result = await servce.selectAll();

      const id = result.Value[0].Id;
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
      expect(result.Value[0].Completed).toBe(true);
      expect(result.Value[0].DueDate).toEqual(dueDate);
      expect(result.Value[0].Status).toBe("完了");
    });

    test("やることを削除する", async () => {
      const servce = new TodoService();
      const params = { title: "タイトル" };
      await servce.create(params);
      let result = await servce.selectAll();
      if (result.Value[0].Id !== null)
        await servce.delete({ id: result.Value[0].Id });
      result = await servce.selectAll();
      expect(result.Value.length).toBe(0);
    });
  });

  describe("異常系", () => {});
});
