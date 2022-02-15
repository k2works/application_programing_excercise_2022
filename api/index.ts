import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { TodoService } from "./application/TodoService";

const router = express.Router();
export interface TodoRequest {
  title: string;
  completed: boolean;
  createdAt: Date | null;
  completedAt: Date | null;
  dueDate: Date | null;
  id: number | null;
}
const service = new TodoService();

router.get("/", async (req, res) => {
  const result = await service.selectAll();
  res.send(result);
});

router.get("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const result = await service.find(parseInt(id));
  res.send(result);
});

router.get("/todos/count", async (req, res) => {
  const result = await service.count();
  res.send(result.toString());
});

router.post("/", async (req, res) => {
  const request: TodoRequest = JSON.parse(JSON.stringify(req.body));
  const result = await service.create(request);
  res.send(result);
});

router.delete("/", async (req, res) => {
  const request = JSON.parse(JSON.stringify(req.body));
  if (request.id !== null) await service.delete(parseInt(request.id));
  res.end();
});

router.put("/", async (req, res) => {
  const request: TodoRequest = JSON.parse(JSON.stringify(req.body));
  await service.update(request);
  res.end();
});

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.text());

createConnection()
  .then(async (connection) => {
    app.use("/api", router);
  })
  .catch((error) => console.log(error));

export default app;
