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
      const params = {
        title: "タイトル",
        completed: false,
        createdAt: null,
        completedAt: null,
        dueDate: null,
        id: null,
      };
      await servce.create(params);
      const result = await servce.selectAll();
      expect(result.Value[0].Title).toBe("タイトル");
    });

    test("やることを更新する", async () => {
      const servce = new TodoService();
      const params = {
        title: "タイトル",
        completed: false,
        createdAt: null,
        completedAt: null,
        dueDate: null,
        id: null,
      };
      await servce.create(params);
      let result = await servce.selectAll();

      const id = result.Value[0].Id;
      const dueDate = new Date();
      if (id !== null) {
        const todo2 = {
          title: "タイトル",
          completed: true,
          createdAt: null,
          completedAt: null,
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
      const params = {
        title: "タイトル",
        completed: false,
        createdAt: null,
        completedAt: null,
        dueDate: null,
        id: null,
      };
      await servce.create(params);
      let result = await servce.selectAll();
      if (result.Value[0].Id !== null) {
        const params = {
          title: result.Value[0].Title,
          completed: result.Value[0].Completed,
          createdAt: result.Value[0].CreatedAt,
          completedAt: result.Value[0].CompletedAt,
          dueDate: result.Value[0].DueDate,
          id: result.Value[0].Id,
        };
        await servce.delete(params);
      }
      result = await servce.selectAll();
      expect(result.Value.length).toBe(0);
    });
  });

  describe("異常系", () => {});
});
