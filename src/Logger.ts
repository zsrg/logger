import CurrentDate from "./utils/CurrentDate";
import FileOutput from "./output/FileOutput";
import ConsoleOutput from "./output/ConsoleOutput";
import Formatter from "./utils/Formatter";

enum LogLevels { CRITICAL, ERROR, WARN, INFO, DEBUG, TRACE }

type Level = keyof typeof LogLevels;

type LogFormatter = (date: string, level: string, message: string) => string;

class Logger {
  private static instance: Logger;

  private level: LogLevels;

  private file: FileOutput;
  private console: ConsoleOutput;

  private formatter: LogFormatter;

  public critical: (message: string) => void;
  public error: (message: string) => void;
  public warn: (message: string) => void;
  public info: (message: string) => void;
  public debug: (message: string) => void;
  public trace: (message: string) => void;

  constructor() {
    this.level = LogLevels.INFO;

    this.file = null;
    this.console = new ConsoleOutput();

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

  public setFile(path: string, name: string) {
    this.file = new FileOutput(path, name);
  }

  private init() {
    const levels = Object.keys(LogLevels).filter((key) => isNaN(+key)) as ReadonlyArray<Level>;
    levels.forEach((level: Level) => (this[level.toLowerCase()] = this.log.bind(this, level)));
  }

  private log(level: Level, message: string) {
    if (this.level < LogLevels[level]) {
      return;
    }

    const date = new CurrentDate().getDateTime();
    const log = this.formatter(date, level, message);

    this.console.log(log);
    this.file?.log(log);
  }
}

export default Logger;
