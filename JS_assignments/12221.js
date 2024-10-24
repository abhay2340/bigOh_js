function merge(intervals) {
  if (intervals.length <= 1) return intervals;


  let result = [intervals[0]]; // Initialize result with the first interval

  for (let i = 1; i < intervals.length; i++) {
    let currentInterval = result[result.length - 1];
    let nextInterval = intervals[i];

    //  If intervals overlap, merge them
    if (currentInterval[1] >= nextInterval[0]) {
      // Overlapping intervals, update the end to the max of the two ends
      currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
    } else {
      // No overlap, push the next interval to the result
      result.push(nextInterval);
    }
  }

  return result;
}

console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));

console.log(merge([[1, 4], [4, 5]]));
