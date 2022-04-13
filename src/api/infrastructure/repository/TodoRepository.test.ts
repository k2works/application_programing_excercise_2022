import { AppDataSource } from "../data-source";
import { TodoEntity } from "../entity/TodoEntity";

describe("TodoEntity", () => {
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
    const createTodo = () => {
      const todo = new TodoEntity();
      todo.title = "タイトル";
      todo.completed = false;
      todo.createdAt = new Date();
      todo.status = "未着手";
      return todo;
    };
    const todoRepository = AppDataSource.manager.getRepository(TodoEntity);

    it("やることを作成する", async () => {
      const todo = createTodo();
      await todoRepository.save(todo);
      expect(todo.id).toBeDefined();
      let result = await todoRepository.findOneBy({ id: 1 });
      if (result) {
        expect(result.title).toBe("タイトル");
        expect(result.completed).toBe(false);
      }
    });

    it("やることを更新する", async () => {
      const todo = createTodo();
      await todoRepository.save(todo);

      let todo2 = await todoRepository.findOneBy({ id: 1 });
      if (todo2) {
        todo2.title = "タイトル2";
        await todoRepository.save(todo2);
        const result = await todoRepository.findOneBy({ id: 1 });
        if (result) expect(result.title).toBe("タイトル2");
      }
    });

    it("やることを削除する", async () => {
      const todo = createTodo();
      await todoRepository.save(todo);
      await todoRepository.remove(todo);
      let result = await todoRepository.find();
      if (result) {
        result = await todoRepository.find();
        expect(result.length).toBe(0);
      }
    });
  });

  describe("異常系", () => {});
});
