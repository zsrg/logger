import CustomDate from "../utils/CustomDate";
import Output from "./Output";
import { createWriteStream, existsSync, WriteStream } from "fs";
import { join } from "path";

export interface FileOutputOptions {
  flags?: string;
  rotation?: "midnight";
}

const FILE_NAME_PATTERN = /{{(.+?)}}/;

class FileOutput extends Output<WriteStream> {
  constructor(path: string, name: string, options: FileOutputOptions) {
    if (!existsSync(path)) {
      throw new Error("Path not found");
    }

    super();
    this.createStream(path, name, options);
  }

  private createStream(path: string, name: string, options: FileOutputOptions) {
    const logName = this.prepareName(name);
    const logPath = join(path, logName);

    const flags = options?.flags ?? "a";
    const rotation = options?.rotation;

    this.stream = createWriteStream(logPath, { flags });

    if (rotation === "midnight") {
      const ms = new CustomDate().getMidnightOffset();
      setTimeout(this.createStream.bind(this, path, name, options), ms);
    }
  }

  private getNameTemplate(name: string) {
    return FILE_NAME_PATTERN.exec(name)?.[1];
  }

  private prepareName(name: string) {
    const template = this.getNameTemplate(name);

    if (!template) {
      return name;
    }

    switch (template) {
      case "DATE": {
        const date = new CustomDate().getDateString();
        return name.replace(FILE_NAME_PATTERN, date);
      }
      default: {
        throw new Error("Unknown pattern");
      }
    }
  }
}

export default FileOutput;
