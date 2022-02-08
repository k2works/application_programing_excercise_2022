import express from "express";
import { Command, FibonacciList, FibonacciRecursive } from "./domain/fibonacci";
const app = express();

app.get("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const command: Command = new FibonacciList(new FibonacciRecursive());
  res.send(command.exec(100));
});

module.exports = app;
