import CurrentDate from "../utils/CurrentDate";
import Output from "./Output";
import { createWriteStream, existsSync } from "fs";
import { join } from "path";

const FILE_NAME_PATTERN = /{{(.+?)}}/;

class FileOutput extends Output {
  private path: string;

  constructor(path: string, name: string) {
    if (!existsSync(path)) {
      throw new Error("Path not found");
    }

    super();
    this.path = join(path, this.checkFileName(name));
    this.stream = createWriteStream(this.path, { flags: "a" });
  }

  private checkFileName(name: string) {
    const data = FILE_NAME_PATTERN.exec(name);

    if (!data) {
      return name;
    }

    const template = data?.[1];

    switch (template) {
      case "DATE": {
        const date = new CurrentDate().getDate();
        return name.replace(FILE_NAME_PATTERN, date);
      }
      default: {
        throw new Error("Unknown pattern");
      }
    }
  }
}

export default FileOutput;
