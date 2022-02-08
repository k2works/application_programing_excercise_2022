import express from "express";
import {
  Command,
  Fibonacci,
  FibonacciList,
  FibonacciTypeEnum,
} from "./domain/fibonacci";
const app = express();

app.get("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const command: Command = new FibonacciList(FibonacciTypeEnum.valueOf(1));
  res.send(command.exec(100));
});

app.get("/api/:type/:number", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { type, number } = req.params;
  const typeValue: number = parseInt(type, 10);
  const numberValue: number = parseInt(number, 10);

  const command: Command = new Fibonacci(FibonacciTypeEnum.valueOf(typeValue));
  res.send({ value: command.exec(numberValue) });
});

app.get("/api/list/:type", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { type } = req.params;
  const value: number = parseInt(type, 10);

  const command: Command = new FibonacciList(FibonacciTypeEnum.valueOf(value));
  res.send(command.exec(100));
});

module.exports = app;
