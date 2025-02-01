export type AnyStream = { write?: (...args: any[]) => any };

class Output<T extends AnyStream> {
  protected stream: T;

  public log(message: string) {
    this.stream.write(message + "\n");
  }
}

export default Output;
