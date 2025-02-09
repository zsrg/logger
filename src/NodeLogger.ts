import ConsoleOutput from "./output/ConsoleOutput";
import FileOutput, { FileOutputOptions } from "./output/FileOutput";
import Logger from "./Logger";

class NodeLogger extends Logger {
  private static instance: NodeLogger;

  constructor() {
    super();
    this.outputs = [new ConsoleOutput()];
  }

  public static getInstance(): NodeLogger {
    if (!NodeLogger.instance) {
      NodeLogger.instance = new NodeLogger();
    }
    return NodeLogger.instance;
  }

  public setFile(path: string, name: string, options?: FileOutputOptions) {
    this.outputs.push(new FileOutput(path, name, options));
  }
}

export default NodeLogger;
