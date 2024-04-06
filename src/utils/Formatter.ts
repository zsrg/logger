class Formatter {
  public static logFormatter = (date: string, level: string, message: string) => {
    return `[${date}] [${level}] ${message}`;
  };
}

export default Formatter;
