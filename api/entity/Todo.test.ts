import { getManager, getRepository } from "typeorm";
import connection from "../connection";
import { Todo } from "./Todo";

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
  const todo = new Todo();
  todo.title = "タイトル";
  todo.completed = false;

  let repository = getRepository(Todo);
  await repository.save(todo);
  expect(todo.id).toBeDefined();
  let result = await repository.findOne();
  expect(result?.title).toBe("タイトル");
  expect(result?.completed).toBe(false);
});

it("やることを更新する", async () => {
  const todo = new Todo();
  todo.title = "タイトル";
  todo.completed = false;

  let repository = getRepository(Todo);
  await repository.save(todo);
  let result = await repository.find();
  result[0].title = "タイトル2";
  await repository.save(result[0]);
  result = await repository.find();
  expect(result[0].title).toBe("タイトル2");
});

it("やることを削除する", async () => {
  const todo = new Todo();
  todo.title = "タイトル";
  todo.completed = false;

  let repository = getRepository(Todo);
  await repository.save(todo);
  let result = await repository.find();
  await repository.remove(result[0]);
  result = await repository.find();
  expect(result.length).toBe(0);
});
