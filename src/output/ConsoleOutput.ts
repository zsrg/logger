import Output from "./Output";

class ConsoleOutput extends Output {
  constructor() {
    super();
    this.stream = process.stdout;
  }
}

export default ConsoleOutput;
