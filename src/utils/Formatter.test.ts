import Formatter from "./Formatter";
import { Request, Response } from "express";

describe("Formatter", () => {
  test("logFormatter('2024-04-06 16:44:20', 'ERROR', 'Error log') => '[2024-04-06 16:44:20] [ERROR] Error log'", () => {
    expect(Formatter.logFormatter("2024-04-06 16:44:20", "ERROR", "Error log")).toBe("[2024-04-06 16:44:20] [ERROR] Error log");
  });

  test("requestDataFormatter({ method: 'GET', url: '/test' }, { statusCode: 404 }) => 'GET /test 404'", () => {
    const req = { method: "GET", url: "/test" } as Request;
    const res = { statusCode: 404 } as Response;
    expect(Formatter.requestDataFormatter(req, res)).toBe("GET /test 404");
  });
});
