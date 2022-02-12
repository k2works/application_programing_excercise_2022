import connection from "../application/connection";
import { CompletedAt } from "../domain/CompletedAt";
import { CreatedAt } from "../domain/CreatedAt";
import { DueDate } from "../domain/DueDate";
import { Todo } from "../domain/Todo";
import { TodoRepository } from "./TodoRepository";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

it("やることを作成する", async () => {
  const repository = new TodoRepository();
  const todo = new Todo("タイトル");
  await repository.addTodo(todo);
  const result = await repository.getTodos();
  expect(result[0].getTitle()).toBe("タイトル");
});

it("やることを更新する", async () => {
  const repository = new TodoRepository();
  const todo = new Todo("タイトル");
  await repository.addTodo(todo);
  let result = await repository.getTodos();

  const id = result[0].getId();
  if (id !== null) {
    const todo2 = new Todo(
      "タイトル2",
      true,
      new CreatedAt(new Date()),
      new CompletedAt(null),
      new DueDate(null),
      id
    );

    await repository.updateTodo(todo2);
    result = await repository.getTodos();
  }
  expect(result[0].getTitle()).toBe("タイトル2");
});

it("やることを削除する", async () => {
  const repository = new TodoRepository();
  const todo = new Todo("タイトル");
  await repository.addTodo(todo);
  let result = await repository.getTodos();
  await repository.deleteTodo(result[0]);
  result = await repository.getTodos();
  expect(result.length).toBe(0);
});
