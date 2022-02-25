import { expect, test } from "vitest";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import hasNoOverlaps, { inRange } from "../src/utils/overlapChecker";

test("inRange", () => {
  expect(inRange(1, 9, 1)).toBe(false);
  expect(inRange(1, 9, 2)).toBe(true);
  expect(inRange(1, 9, 3)).toBe(true);
  expect(inRange(1, 9, 4)).toBe(true);
  expect(inRange(1, 9, 5)).toBe(true);
  expect(inRange(1, 9, 6)).toBe(true);
  expect(inRange(1, 9, 7)).toBe(true);
  expect(inRange(1, 9, 8)).toBe(true);
  expect(inRange(1, 9, 9)).toBe(false);

  expect(inRange(1, 9, 10)).toBe(false);
  expect(inRange(1, 9, 0)).toBe(false);
  expect(inRange(1, 9, 11)).toBe(false);
});

test("hasNoOverlaps", () => {
  const dummyData = [
    {
      startDate: new Date(2018, 5, 25, 7),
      endDate: new Date(2018, 5, 25, 10),
      id: 0,
    },
    {
      startDate: new Date(2018, 5, 25, 10),
      endDate: new Date(2018, 5, 25, 11),
      id: 1,
    },
    {
      startDate: new Date(2018, 5, 25, 16),
      endDate: new Date(2018, 5, 25, 17, 30),
      id: 2,
    },
    {
      startDate: new Date(2018, 5, 26, 7, 0),
      endDate: new Date(2018, 5, 26, 10, 0),
      id: 3,
    },
  ];
  expect(
    hasNoOverlaps(
      {
        id: 3,
        startDate: new Date(2018, 5, 26, 7, 0),
        endDate: new Date(2018, 5, 26, 11, 0),
      },
      dummyData as [AppointmentModel],
    ),
  ).toBe(true);
  expect(
    hasNoOverlaps(
      {
        id: 6,
        startDate: new Date(2018, 5, 26, 7, 0),
        endDate: new Date(2018, 5, 26, 11, 0),
      },
      dummyData as [AppointmentModel],
    ),
  ).toBe(false);
  expect(
    hasNoOverlaps(
      {
        id: 6,
        startDate: new Date(2018, 5, 26, 6, 0),
        endDate: new Date(2018, 5, 26, 7, 0),
      },
      dummyData as [AppointmentModel],
    ),
  ).toBe(true);
});
