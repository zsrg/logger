import ConsoleOutput from "./output/ConsoleOutput";
import CurrentDate from "./utils/CurrentDate";
import CustomOutput from "./output/CustomOutput";
import FileOutput, { FileOutputParams } from "./output/FileOutput";
import Formatter, { LogFormatter } from "./utils/Formatter";
import { format } from "util";
import { Stream } from "./output/Output";

enum LogLevels { CRITICAL, ERROR, WARN, INFO, DEBUG, TRACE }

type Level = keyof typeof LogLevels;

type Outputs = ConsoleOutput | FileOutput | CustomOutput;

class Logger {
  private static instance: Logger;

  private outputs: Outputs[];

  private level: LogLevels;

  private formatter: LogFormatter;

  public critical: (message?: any, ...optionalParams: any[]) => void;
  public error: (message?: any, ...optionalParams: any[]) => void;
  public warn: (message?: any, ...optionalParams: any[]) => void;
  public info: (message?: any, ...optionalParams: any[]) => void;
  public debug: (message?: any, ...optionalParams: any[]) => void;
  public trace: (message?: any, ...optionalParams: any[]) => void;

  constructor() {
    this.level = LogLevels.INFO;

    this.outputs = [new ConsoleOutput()];

    this.formatter = Formatter.logFormatter;

    this.init();
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLevel(level: Level) {
    this.level = LogLevels[level];
  }

  public setFormatter(formatter: LogFormatter) {
    this.formatter = formatter;
  }

  public setFile(path: string, name: string, params?: FileOutputParams) {
    this.outputs.push(new FileOutput(path, name, params));
  }

  public setStream(stream: Stream) {
    this.outputs.push(new CustomOutput(stream));
  }

  private init() {
    const levels = Object.keys(LogLevels).filter((key) => isNaN(+key)) as ReadonlyArray<Level>;
    levels.forEach((level: Level) => (this[level.toLowerCase()] = this.log.bind(this, level)));
  }

  private log(level: Level, message?: any, ...optionalParams: any[]) {
    if (this.level < LogLevels[level]) {
      return;
    }

    const date = new CurrentDate().getDateTime();
    const log = this.formatter(date, level, format(message, ...optionalParams));

    this.outputs.forEach((output: Outputs) => output.log(log));
  }
}

export default Logger;
