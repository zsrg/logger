import Output, { Stream } from "./Output";

class CustomOutput extends Output {
  constructor(stream: Stream) {
    super();
    this.stream = stream;
  }
}

export default CustomOutput;
