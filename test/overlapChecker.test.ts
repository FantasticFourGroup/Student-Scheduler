import { expect, test } from "vitest";
import { AppointmentModel } from "../src/types/Models";
import getOverlaps, { inRange } from "../src/utils/overlapChecker";

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

test("getOverlaps", () => {
  const dummyData: AppointmentModel[] = [
    {
      title: "dummy",
      startDate: new Date(2018, 5, 25, 7),
      endDate: new Date(2018, 5, 25, 10),
      id: 0,
    },
    {
      title: "dummy",
      startDate: new Date(2018, 5, 25, 10),
      endDate: new Date(2018, 5, 25, 11),
      id: 1,
    },
    {
      title: "dummy",
      startDate: new Date(2018, 5, 25, 16),
      endDate: new Date(2018, 5, 25, 17, 30),
      id: 2,
    },
    {
      title: "dummy",
      id: 3,
      startDate: new Date(2018, 5, 26, 7, 0),
      endDate: new Date(2018, 5, 26, 10, 0),
    },
  ];
  expect(
    getOverlaps(
      {
        title: "dummy",
        id: 3,
        startDate: new Date(2018, 5, 26, 7, 0),
        endDate: new Date(2018, 5, 26, 11, 0),
      },
      dummyData as AppointmentModel[],
    ),
  ).toBeUndefined();
  expect(
    getOverlaps(
      {
        title: "dummy",
        id: 6,
        startDate: new Date(2018, 5, 26, 7, 0),
        endDate: new Date(2018, 5, 26, 11, 0),
      },
      dummyData,
    ),
  ).toEqual([
    {
      title: "dummy",
      startDate: new Date(2018, 5, 26, 7, 0),
      endDate: new Date(2018, 5, 26, 10, 0),
      id: 3,
    },
  ]);
  expect(
    getOverlaps(
      {
        title: "dummy",
        id: 6,
        startDate: new Date(2018, 5, 26, 6, 0),
        endDate: new Date(2018, 5, 26, 7, 0),
      },
      dummyData,
    ),
  ).toBeUndefined();
});
