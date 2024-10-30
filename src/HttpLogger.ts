import Formatter from "./utils/Formatter";
import Logger from "./Logger";
import { NextFunction, Request, Response } from "express";

type RequestDataFormatter = (req: Request, res: Response) => string;

class HttpLogger {
  private logger: Logger;
  private formatter: RequestDataFormatter;

  constructor(logger: Logger) {
    this.logger = logger;
    this.formatter = Formatter.requestDataFormatter;
  }

  public setFormatter = (formatter: RequestDataFormatter) => {
    this.formatter = formatter;
  }

  public loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      this.logger[res.statusCode < 400 ? "info" : "error"](this.formatter(req, res));
    });
    next();
  }
}

export default HttpLogger;
