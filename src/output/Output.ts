import * as fs from "fs";
import * as tty from "tty";

type Stream = tty.WriteStream | fs.WriteStream;

class Output {
  protected stream: Stream;

  public log(message: string) {
    this.stream.write(message + "\n");
  }
}

export default Output;
