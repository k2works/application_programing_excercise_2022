module.exports = {
  type: "sqlite",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "db.sqlite",
  synchronize: true,
  logging: false,
  entities: ["api/entity/**/*.ts"],
  migrations: ["migration/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "migration",
  },
};