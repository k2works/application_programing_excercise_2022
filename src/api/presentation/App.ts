import express from "express";
import cors from "cors";
import { TodoService } from "../application/TodoService";
import { createConnection } from "typeorm";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.text());
const service = new TodoService();

createConnection()
  .then(async (connection) => {
    app.get("/api", async (req, res) => {
      const result = await service.selectAll();
      console.log(result);
      res.send(result);
    });
  })
  .catch((error) => console.log(error));

export default app;
