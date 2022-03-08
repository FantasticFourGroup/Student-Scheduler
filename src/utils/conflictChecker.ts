// import { appointmentsMale , appointmentsFemale } from "../../demo-data/appointments";

export default function overlap(dateRanges: Array<
  {
    title: string,
    startDate: Date,
    endDate: Date,
    id: number
  }>) {

  var sortedRanges = dateRanges.sort((previous, current) => {
    // get the start date from previous and current
    var previousTime = previous.startDate.getTime();
    var currentTime = current.startDate.getTime();

    return previousTime - currentTime;
  });

  var result = sortedRanges.reduce(
    (result, current, index, arr) => {
      // get the previous range
      if (index === 0) {
        return result;
      }
      var previous = arr[index - 1];

      // check for any overlap
      var previousEnd = previous.endDate.getTime();
      var currentStart = current.startDate.getTime();
      var overlap = previousEnd > currentStart;

      // store the result
      if (overlap) {
        result.overlap = true;
        // store the specific ranges that overlap
        result.ranges.push({
          date1: previous,
          date2: current,
        });
      }

      return result;

      // seed the reduce
    },
    {
      overlap: false,
      ranges:
        Array<{
          date1: {
            title: string,
            startDate: Date,
            endDate: Date,
            id: number
          },
          date2: {
            title: string,
            startDate: Date,
            endDate: Date,
            id: number
          }
        }>()
    }
  );

  // return the final results
  return result;
}


// const outputMale = JSON.stringify(overlap(appointmentsMale), null, 2);
// console.log("Checking conflicts: ", outputMale);
// const outputFemale = JSON.stringify(overlap(appointmentsFemale), null, 2);
// console.log("Checking conflicts: ", outputFemale);
