import Filter, { RequestDataFilter } from "./utils/Filter";
import Formatter, { RequestDataFormatter } from "./utils/Formatter";
import Logger from "./Logger";
import { NextFunction, Request, Response } from "express";

class HttpLogger {
  private logger: Logger;
  private formatter: RequestDataFormatter;
  private filter: RequestDataFilter;

  constructor(logger: Logger) {
    this.logger = logger;
    this.formatter = Formatter.requestDataFormatter;
    this.filter = Filter.requestDataFilter;
  }

  public setFormatter = (formatter: RequestDataFormatter) => {
    this.formatter = formatter;
  }

  public setFilter = (filter: RequestDataFilter) => {
    this.filter = filter;
  }

  public loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      if (!this.filter(req, res)) {
        return;
      }

      const level = res.statusCode < 400 ? "info" : "error";
      const log = this.formatter(req, res);

      this.logger[level](log);
    });

    next();
  }
}

export default HttpLogger;
