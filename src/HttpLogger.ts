import Filter, { RequestDataFilter } from "./utils/Filter";
import Formatter, { RequestDataFormatter } from "./utils/Formatter";
import NodeLogger from "./NodeLogger";
import { NextFunction, Request, Response } from "express";

class HttpLogger {
  private logger: NodeLogger;
  private formatter: RequestDataFormatter;
  private filter: RequestDataFilter;

  constructor(logger: NodeLogger) {
    this.logger = logger;
    this.formatter = Formatter.requestDataFormatter;
    this.filter = Filter.requestDataFilter;
  }

  public setFormatter(formatter: RequestDataFormatter) {
    this.formatter = formatter;
  }

  public setFilter(filter: RequestDataFilter) {
    this.filter = filter;
  }

  public loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      const checkFilter = this.filter(req, res);

      if (!checkFilter) {
        return;
      }

      const level = res.statusCode < 400 ? "info" : "error";
      const log = this.formatter(req, res);

      this.logger[level](log);
    });

    next();
  };
}

export default HttpLogger;
