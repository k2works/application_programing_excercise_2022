import { DataSource } from "typeorm";
import { Todo } from "./entity/Todo";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [User, Todo],
  subscribers: [],
  migrations: [],
});
