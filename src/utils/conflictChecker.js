"use strict";
exports.__esModule = true;
var appointments_1 = require("../../demo-data/appointments");
function overlap(dateRanges) {
    var sortedRanges = dateRanges.sort(function (previous, current) {
        // get the start date from previous and current
        var previousTime = previous.startDate.getTime();
        var currentTime = current.startDate.getTime();
        return previousTime - currentTime;
    });
    var result = sortedRanges.reduce(function (result, current, index, arr) {
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
                date2: current
            });
        }
        return result;
        // seed the reduce
    }, { overlap: false,
        ranges: Array() });
    // return the final results
    return result;
}
exports["default"] = overlap;
var outputMale = JSON.stringify(overlap(appointments_1.appointmentsMale), null, 2);
console.log("Checking conflicts: ", outputMale);
var outputFemale = JSON.stringify(overlap(appointments_1.appointmentsFemale), null, 2);
console.log("Checking conflicts: ", outputFemale);
