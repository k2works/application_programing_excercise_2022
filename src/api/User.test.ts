import { User } from "./entity/User";
import { AppDataSource } from "./data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

beforeEach(async () => {
  await AppDataSource.manager.clear(User);
});

it("ユーザーを作成する", async () => {
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;

  let manager = AppDataSource.manager;
  await manager.save(user);
  expect(user.id).toBeDefined();
  let result = await manager.findOneBy(User, { id: 1 });
  if (result) {
    expect(result.firstName).toBe("Timber");
    expect(result.lastName).toBe("Saw");
    expect(result.age).toBe(25);
  }

  let repository = AppDataSource.getRepository(User);
  await repository.save(user);
  expect(user.id).toBeDefined();
  result = await manager.findOneBy(User, { id: 1 });

  if (result) {
    expect(result.firstName).toBe("Timber");
    expect(result.lastName).toBe("Saw");
    expect(result.age).toBe(25);
  }
});

it("ユーザーを更新する", async () => {
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;

  let manager = AppDataSource.manager;
  await manager.save(user);
  let result = await manager.find(User);
  result[0].firstName = "Timber2";
  await manager.save(result[0]);
  result = await manager.find(User);
  expect(result[0].firstName).toBe("Timber2");

  let repository = AppDataSource.getRepository(User);
  await repository.save(user);
  result = await repository.find();
  result[0].firstName = "Timber2";
  await repository.save(result[0]);
  result = await repository.find();
  expect(result[0].firstName).toBe("Timber2");
});

it("ユーザーを削除する", async () => {
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;

  let manager = AppDataSource.manager;
  await manager.save(user);
  let result = await manager.find(User);
  await manager.remove(result[0]);
  result = await manager.find(User);
  expect(result.length).toBe(0);

  let repository = AppDataSource.getRepository(User);
  await repository.save(user);
  result = await repository.find();
  await repository.remove(result[0]);
  result = await repository.find();
  expect(result.length).toBe(0);
});
