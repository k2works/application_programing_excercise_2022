import { DataSource } from "typeorm";
import { Todo } from "./entity/Todo";
import { TodoEntity } from "./entity/TodoEntity";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [Todo, TodoEntity],
  subscribers: [],
  migrations: [],
});
