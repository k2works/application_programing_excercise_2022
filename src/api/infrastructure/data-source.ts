import { DataSource } from "typeorm";
import { StatusEntity } from "./entity/StatusEntity";
import { TodoEntity } from "./entity/TodoEntity";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [TodoEntity, StatusEntity],
  subscribers: [],
  migrations: [],
});
