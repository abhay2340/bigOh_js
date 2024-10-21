// function countWays(arr, target) {
//     const n = arr.length;
    
//     // Calculate the total possible sum range
//     const totalSum = arr.reduce((sum, num) => sum + Math.abs(num), 0);

//     // Handle edge case where the target is out of the possible sum range
//     if (Math.abs(target) > totalSum) {
//         return 0;
//     }

//     // Initialize a 2D DP array
//     const dp = Array(n + 1).fill(0).map(() => Array(2 * totalSum + 1).fill(0));
    
//     // Base case: one way to get a sum of 0 with 0 elements
//     dp[0][totalSum] = 1;

//     // Fill the DP table
//     for (let i = 1; i <= n; i++) {
//         for (let j = -totalSum; j <= totalSum; j++) {
//             const currentIndex = j + totalSum; // Adjust index to be positive
//             // If we add the current element
//             if (j - arr[i - 1] >= -totalSum) {
//                 dp[i][currentIndex] += dp[i - 1][currentIndex - arr[i - 1]];
//             }
//             // If we subtract the current element
//             if (j + arr[i - 1] <= totalSum) {
//                 dp[i][currentIndex] += dp[i - 1][currentIndex + arr[i - 1]];
//             }
//         }
//     }

//     // The answer will be the number of ways to achieve the target
//     return dp[n][target + totalSum];
// }

// // Example usage
// const arr = [-1, 9, 8, -3, 4];
// const targetSum = 5;
// const result = countWays(arr, targetSum);
// console.log(result); // Output: 8
