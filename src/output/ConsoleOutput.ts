import Output from "./Output";
import { WriteStream } from "tty";

class ConsoleOutput extends Output<WriteStream> {
  constructor() {
    super();
    this.stream = process.stdout;
  }
}

export default ConsoleOutput;
