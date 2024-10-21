let intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
console.log(intervals.length);
console.log(intervals[2][1])
let newInterval;
for (let i = 0; i < intervals.length-1; i++) {
    while(arr[i][1]>=arr[i+1][0]||arr[i][1]>=arr[i+1][1]){
        i++;
    }
}
