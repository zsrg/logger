import Formatter from "./Formatter";
import { Request, Response } from "express";

describe("Formatter", () => {
  test("should return a formatted log string", () => {
    const date = "2025-02-09 20:45:57";
    const level = "ERROR";
    const message = "Error log";
    const expectedString = "[2025-02-09 20:45:57] [ERROR] Error log";
    expect(Formatter.logFormatter(date, level, message)).toBe(expectedString);
  });

  test("should return a formatted request data string", () => {
    const req = { method: "GET", url: "/test" } as Request;
    const res = { statusCode: 404 } as Response;
    const expectedString = "GET /test 404";
    expect(Formatter.requestDataFormatter(req, res)).toBe(expectedString);
  });
});
