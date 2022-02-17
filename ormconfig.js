module.exports = {
  type: "better-sqlite3",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: ["src/api/entity/**/*.ts"],
  migrations: ["migration/*.ts"],
  cli: {
    entitiesDir: "src/api/entity",
    migrationsDir: "migration",
  },
};
