import { CompletedAt } from "../../domain/model/CompletedAt";
import { CreatedAt } from "../../domain/model/CreatedAt";
import { DueDate } from "../../domain/model/DueDate";
import { Todo } from "../../domain/model/Todo";
import { TodoStatusType } from "../../domain/type/TodoStatusType";
import { AppDataSource } from "../data-source";
import { TodoEntity } from "../entity/TodoEntity";
import { TodoRepository } from "./TodoRepository";

describe("TodoRepository", () => {
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
    const params = {
      title: "タイトル",
      completed: false,
      createdAt: new CreatedAt(new Date()),
      completedAt: new CompletedAt(null),
      dueDate: new DueDate(null),
      id: null,
    };

    test("やることを作成する", async () => {
      const repository = new TodoRepository();
      const todo = Todo.create(params);
      await repository.add(todo);
      const result = await repository.getAll();
      expect(result.Value[0].Title).toBe("タイトル");
      expect(result.Value[0].Status).toBe("未着手");
      expect(result.Value[0].StatusCode).toBe(
        TodoStatusType.NOT_STARTED.toString()
      );
      expect(result.Value[0].StatusType).toBe("TODO");
    });

    test("やることを更新する", async () => {
      const repository = new TodoRepository();
      const todo = Todo.create(params);
      await repository.add(todo);
      let result = await repository.getAll();

      const id = result.Value[0].Id;
      if (id !== null) {
        const todo2 = new Todo({
          ...params,
          title: "タイトル2",
          completed: true,
          id,
        });

        await repository.update(todo2);
        result = await repository.getAll();
      }
      expect(result.Value[0].Title).toBe("タイトル2");
      expect(result.Value[0].Status).toBe("完了");
      expect(result.Value[0].StatusCode).toBe(
        TodoStatusType.COMPLETED.toString()
      );
      expect(result.Value[0].StatusType).toBe("TODO");
    });

    test("やることを削除する", async () => {
      const repository = new TodoRepository();
      const todo = Todo.create(params);
      await repository.add(todo);
      let result = await repository.getAll();
      await repository.delete(result.Value[0]);
      result = await repository.getAll();
      expect(result.Value.length).toBe(0);
    });
  });

  describe("異常系", () => {});
});
