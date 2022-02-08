import express from "express";
import { Command } from "./application/command";
import { Fibonacci } from "./application/fibonacci";
import { FibonacciList } from "./application/fibonacciList";
import { FibonacciTypeEnum } from "./domain/type/fibonacciTypeEnum";
const app = express();

app.get("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const command: Command = new FibonacciList(
    new Fibonacci(FibonacciTypeEnum.valueOf(1))
  );
  const json = JSON.stringify(command.exec(100), (k, v) =>
    typeof v === "bigint" ? v.toString() + "n" : v
  );
  res.send(json);
});

app.post("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { type, number } = req.params;
  const typeValue: number = parseInt(type, 10);
  const numberValue: number = parseInt(number, 10);

  const command: Command = new Fibonacci(FibonacciTypeEnum.valueOf(typeValue));
  res.send({ value: command.exec(numberValue) });
});

app.get("/api/:type", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { type } = req.params;
  const value: number = parseInt(type, 10);

  const command: Command = new FibonacciList(
    new Fibonacci(FibonacciTypeEnum.valueOf(value))
  );
  const json = JSON.stringify(command.exec(100), (k, v) =>
    typeof v === "bigint" ? v.toString() + "n" : v
  );
  res.send(json);
});

module.exports = app;
