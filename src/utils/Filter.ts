import { Request, Response } from "express";

export type RequestDataFilter = (req: Request, res: Response) => boolean;

class Filter {
  public static requestDataFilter = (req: Request, res: Response) => {
    return true;
  };
}

export default Filter;
