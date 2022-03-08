import { expect, test } from "vitest";
import { getTimeFormat, toDate } from "../src/utils/timeFormat";

test("getTimeFormat", () => {
  expect(getTimeFormat(new Date(2018, 5, 26, 16, 0))).toBe("16:00");
  expect(getTimeFormat(new Date(2018, 5, 26, 10, 0))).toBe("10:00");
  expect(getTimeFormat(new Date(2018, 5, 26, 10, 10))).toBe("10:10");
  expect(getTimeFormat(new Date(2018, 5, 26, 11, 11))).toBe("11:11");
  expect(getTimeFormat(new Date(2018, 5, 26, 1, 1))).toBe("01:01");
});

test("toDate", () => {
  expect(toDate("1", "16:00")).toEqual(new Date(2018, 5, 25, 16, 0));
  expect(toDate("2", "16:00")).toEqual(new Date(2018, 5, 26, 16, 0));
  expect(toDate("3", "16:00")).toEqual(new Date(2018, 5, 27, 16, 0));
  expect(toDate("4", "16:00")).toEqual(new Date(2018, 5, 28, 16, 0));
  expect(toDate("5", "16:00")).toEqual(new Date(2018, 5, 29, 16, 0));
  expect(toDate("6", "16:00")).toEqual(new Date(2018, 5, 30, 16, 0));
  expect(toDate("6", "01:01")).toEqual(new Date(2018, 5, 30, 1, 1));
});
