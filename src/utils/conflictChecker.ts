import { ScheduleProps, DataRangeProps } from "../types";

export default function overlap(dateRanges: Array<ScheduleProps>) {
  const sortedRanges = dateRanges.sort((previous, current) => {
    // get the start date from previous and current
    const previousTime = previous.startDate.getTime();
    const currentTime = current.startDate.getTime();

    return previousTime - currentTime;
  });

  const result = sortedRanges.reduce(
    (res, current, index, arr) => {
      // get the previous range
      if (index === 0) {
        return res;
      }
      const previous = arr[index - 1];

      // check for any overlap
      const previousEnd = previous.endDate.getTime();
      const currentStart = current.startDate.getTime();
      const hasOverlap = previousEnd > currentStart;

      // store the res
      if (hasOverlap) {
        res.hasOverlap = true;
        // store the specific ranges that hasOverlap
        res.ranges.push({
          date1: previous,
          date2: current,
        });
      }

      return res;

      // seed the reduce
    },
    {
      hasOverlap: false,
      // eslint-disable-next-line no-array-constructor
      ranges: Array<DataRangeProps>(),
    },
  );

  // return the final results
  return result;
}
