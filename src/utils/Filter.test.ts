import Filter from "./Filter";
import { Request, Response } from "express";

describe("Filter", () => {
  test("requestDataFilter({}, {}) => 'true'", () => {
    expect(Filter.requestDataFilter({} as Request, {} as Response)).toBe(true);
  });
});
