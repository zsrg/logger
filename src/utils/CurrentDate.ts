class CurrentDate {
  private date: Date;

  constructor() {
    this.date = new Date();
  }

  public getDate() {
    const d = this.numberToString(this.date.getDate());
    const m = this.numberToString(this.date.getMonth() + 1);
    const y = this.numberToString(this.date.getFullYear());

    return `${y}-${m}-${d}`;
  }

  public getTime() {
    const h = this.numberToString(this.date.getHours());
    const m = this.numberToString(this.date.getMinutes());
    const s = this.numberToString(this.date.getSeconds());

    return `${h}:${m}:${s}`;
  }

  public getDateTime() {
    return `${this.getDate()} ${this.getTime()}`;
  }

  public getMidnightOffset() {
    const nextDate = new Date(this.date);
    nextDate.setDate(this.date.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);

    return nextDate.valueOf() - this.date.valueOf();
  }

  private numberToString(value: number, length: number = 2) {
    return String(value).padStart(length, "0");
  }
}

export default CurrentDate;
