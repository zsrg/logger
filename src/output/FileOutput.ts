import CurrentDate from "../utils/CurrentDate";
import Output from "./Output";
import { createWriteStream, existsSync } from "fs";
import { join } from "path";

const FILE_NAME_PATTERN = /{{(.+?)}}/;

export interface FileOutputParams {
  midnightRotation?: boolean;
}

class FileOutput extends Output {
  private path: string;
  private name: string;
  private params: FileOutputParams;

  constructor(path: string, name: string, params?: FileOutputParams) {
    if (!existsSync(path)) {
      throw new Error("Path not found");
    }

    super();

    this.path = path;
    this.name = name;
    this.params = params;

    this.createStream();
  }

  private getNameTemplate = (name: string) => {
    return FILE_NAME_PATTERN.exec(name)?.[1];
  }

  private createStream = () => {
    const template = this.getNameTemplate(this.name);
    const name = this.prepareName(this.name, template);
    const path = join(this.path, name);

    this.stream = createWriteStream(path, { flags: "a" });

    if (this.params?.midnightRotation) {
      if (template !== "DATE") {
        throw new Error("For midnight rotation you need to use the 'DATE' template");
      }

      const ms = new CurrentDate().getMidnightOffset();
      setTimeout(this.createStream, ms);
    }
  }

  private prepareName = (name: string, template: string) => {
    if (!template) {
      return name;
    }

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
