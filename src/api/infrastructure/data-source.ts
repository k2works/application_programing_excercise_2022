import { DataSource } from "typeorm";
import { TodoEntity } from "./entity/TodoEntity";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [TodoEntity],
  subscribers: [],
  migrations: [],
});
