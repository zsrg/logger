import { Request, Response } from "express";

class Formatter {
  public static logFormatter = (date: string, level: string, message: string) => {
    return `[${date}] [${level}] ${message}`;
  };

  public static requestDataFormatter = (req: Request, res: Response) => {
    return `${req.method} ${req.url} ${res.statusCode}`;
  };
}

export default Formatter;
