import connection from "../utils/connection";
import { Todo } from "../domain/Todo";
import { TodoService } from "./TodoService";
import { TodoRequest } from "..";

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
  function setupParams(
    title: string = "タイトル",
    id: number | null = null
  ): TodoRequest {
    const todo = new Todo(title);
    const params: TodoRequest = {
      title: todo.Title,
      completed: todo.Completed,
      createdAt: todo.CreatedAt,
      completedAt: todo.CompletedAt,
      dueDate: todo.DueDate,
      id: id,
    };
    return params;
  }
  describe("正常系", () => {
    it("やることを作成する", async () => {
      const servce = new TodoService();
      const params: TodoRequest = setupParams();
      await servce.create(params);
      const result = await servce.selectAll();
      expect(result.Value[0].Title).toBe("タイトル");
    });

    it("やることを検索する", async () => {
      const servce = new TodoService();
      const params: TodoRequest = setupParams();
      await servce.create(params);
      if (params.id !== null) {
        const result = await servce.find(params.id);
        expect(result.Title).toBe("タイトル");
      }
    });

    it("やることを更新する", async () => {
      const servce = new TodoService();
      const params: TodoRequest = setupParams();
      await servce.create(params);
      let result = await servce.selectAll();

      const id = result.Value[0].Id;
      if (id !== null) {
        const params2: TodoRequest = setupParams("タイトル2", id);
        await servce.update(params2);
        result = await servce.selectAll();
      }
      expect(result.Value[0].Title).toBe("タイトル2");
    });

    it("やることを削除する", async () => {
      const servce = new TodoService();
      const params: TodoRequest = setupParams();
      await servce.create(params);
      let result = await servce.selectAll();
      if (result.Value[0].Id !== null) {
        await servce.delete(result.Value[0].Id);
        result = await servce.selectAll();
        expect(result.Value.length).toBe(0);
      }
    });

    it("やることの件数を取得する", async () => {
      const servce = new TodoService();
      const params: TodoRequest = setupParams();
      await servce.create(params);
      if (params.id !== null) {
        const result = await servce.count();
        expect(result).toBe(1);
      }
    });

    it("未着手のステータスを記録する", async () => {
      const servce = new TodoService();
      const params: TodoRequest = setupParams();
      await servce.create(params);
      const result = await servce.find(1);
      expect(result.Status).toBe("未着手");
    });
  });

  describe("異常系", () => {});
});