import CustomDate from "./CustomDate";

describe("CustomDate", () => {
  const customDate = new CustomDate();

  // @ts-ignore
  customDate.date = new Date("Feb 09 2025 20:45:57");

  test("should return the correct date string", () => {
    expect(customDate.getDateString()).toBe("2025-02-09");
  });

  test("should return the correct time string", () => {
    expect(customDate.getTimeString()).toBe("20:45:57");
  });

  test("should return the correct date time string", () => {
    expect(customDate.getDateTimeString()).toBe("2025-02-09 20:45:57");
  });

  test("should return the number of milliseconds until midnight", () => {
    expect(customDate.getMidnightOffset()).toBe(11643000);
  });

  test("should convert a single digit number to a string", () => {
    // @ts-ignore
    expect(customDate.numberToString(1)).toBe("01");
  });

  test("should convert a two digit number to a string", () => {
    // @ts-ignore
    expect(customDate.numberToString(10)).toBe("10");
  });
});
