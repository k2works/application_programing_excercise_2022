import { EventEmitter } from "./EventEmitter";

const spyLog = jest.spyOn(console, "log");
spyLog.mockImplementation((x) => x);

describe("EvenEmitterの実行サンプル", () => {
  test("イベントをディスパッチする", () => {
    const event = new EventEmitter();
    event.addEventListener("test-event", () => console.log("One!"));
    event.addEventListener("test-event", () => console.log("Two!"));
    event.emit("test-event");

    expect(console.log).toBeCalled();
    expect(spyLog.mock.calls[0][0]).toEqual("One!");
    expect(spyLog.mock.calls[1][0]).toEqual("Two!");
  });
});
