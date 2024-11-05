import CurrentDate from "./CurrentDate";

describe("CurrentDate", () => {
  const currentDate = new CurrentDate();

  // @ts-ignore
  currentDate.date = new Date("06 Apr 2024 16:44:20");

  test("getDate() => '2024-04-06'", () => {
    expect(currentDate.getDate()).toBe("2024-04-06");
  });

  test("getTime() => '16:44:20'", () => {
    expect(currentDate.getTime()).toBe("16:44:20");
  });

  test("getDateTime() => '2024-04-06 16:44:20'", () => {
    expect(currentDate.getDateTime()).toBe("2024-04-06 16:44:20");
  });

  test("getMidnightOffset() => '26140000'", () => {
    expect(currentDate.getMidnightOffset()).toBe(26140000);
  });

  test("numberToString(1) => '01'", () => {
    // @ts-ignore
    expect(currentDate.numberToString(1)).toBe("01");
  });

  test("numberToString(10) => '10'", () => {
    // @ts-ignore
    expect(currentDate.numberToString(10)).toBe("10");
  });

  test("numberToString(1, 4) => '0001'", () => {
    // @ts-ignore
    expect(currentDate.numberToString(1, 4)).toBe("0001");
  });
});
