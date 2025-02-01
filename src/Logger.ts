import CustomDate from "./utils/CustomDate";
import Formatter, { LogFormatter } from "./utils/Formatter";
import Output, { AnyStream } from "./output/Output";
import { format } from "util";

export enum LogLevels { CRITICAL, ERROR, WARN, INFO, DEBUG, TRACE }

export type Level = keyof typeof LogLevels;

class Logger {
  private level: LogLevels;
  private formatter: LogFormatter;

  protected outputs: Output<AnyStream>[];

  public critical: (message?: any, ...optionalParams: any[]) => void;
  public error: (message?: any, ...optionalParams: any[]) => void;
  public warn: (message?: any, ...optionalParams: any[]) => void;
  public info: (message?: any, ...optionalParams: any[]) => void;
  public debug: (message?: any, ...optionalParams: any[]) => void;
  public trace: (message?: any, ...optionalParams: any[]) => void;

  constructor() {
    this.level = LogLevels.INFO;
    this.formatter = Formatter.logFormatter;

    this.outputs = [];

    this.init();
  }

  public setLevel(level: Level) {
    this.level = LogLevels[level];
  }

  public setFormatter(formatter: LogFormatter) {
    this.formatter = formatter;
  }

  private init() {
    const levels = Object.keys(LogLevels).filter((key) => isNaN(+key)) as ReadonlyArray<Level>;
    levels.forEach((level: Level) => (this[level.toLowerCase()] = this.log.bind(this, level)));
  }

  private log(level: Level, message?: any, ...optionalParams: any[]) {
    if (this.level < LogLevels[level]) {
      return;
    }

    const date = new CustomDate().getDateTimeString();
    const log = this.formatter(date, level, format(message, ...optionalParams));

    this.outputs.forEach((output: Output<AnyStream>) => output.log(log));
  }
}

export default Logger;
