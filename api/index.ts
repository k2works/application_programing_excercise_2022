import express from "express";
import { Command, FibonacciList, FibonacciTypeEnum } from "./domain/fibonacci";
const app = express();

app.get("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const command: Command = new FibonacciList(FibonacciTypeEnum.valueOf(1));
  res.send(command.exec(100));
});

module.exports = app;
