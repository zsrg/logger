class CustomDate {
  private date: Date;

  constructor() {
    this.date = new Date();
  }

  public getDateString() {
    const d = this.numberToString(this.date.getDate());
    const m = this.numberToString(this.date.getMonth() + 1);
    const y = this.numberToString(this.date.getFullYear());

    return `${y}-${m}-${d}`;
  }

  public getTimeString() {
    const h = this.numberToString(this.date.getHours());
    const m = this.numberToString(this.date.getMinutes());
    const s = this.numberToString(this.date.getSeconds());

    return `${h}:${m}:${s}`;
  }

  public getDateTimeString() {
    const date = this.getDateString();
    const time = this.getTimeString();

    return `${date} ${time}`;
  }

  public getMidnightOffset() {
    const date = new Date(this.date);
    date.setHours(24, 0, 0, 0);

    return date.valueOf() - this.date.valueOf();
  }

  private numberToString(value: number, length = 2) {
    return String(value).padStart(length, "0");
  }
}

export default CustomDate;
