import express from "express";
import cors from "cors";
import { Todo } from "./Todo";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.text());

app.get("/api", (req, res) => {
  const todo = new Todo("hello world");
  res.send(todo.Title);
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("Server is running on port " + app.get("port"));
});

export default app;
