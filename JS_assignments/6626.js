function findCombinations(arr, targetSum, index, currentSum, expression, results) {
    // Base case: check if we've processed all elements
    if (index === arr.length) {
        if (currentSum === targetSum) {
            results.push(expression); // Store the valid combination
        }
        return;
    }
    
    // Include the current element with a + sign
    findCombinations(arr, targetSum, index + 1, currentSum + arr[index], 
                     expression + (index > 0 ? " + " : "") + arr[index], results);
    
    // Include the current element with a - sign
    findCombinations(arr, targetSum, index + 1, currentSum - arr[index], 
                     expression + (index > 0 ? " - " : "") + arr[index], results);
    
    // Skip the current element
    findCombinations(arr, targetSum, index + 1, currentSum, expression, results);
}

function targetSum(arr, targetSum) {
    const results = [];
    
    // Start the recursive combination search
    findCombinations(arr, targetSum, 0, 0, "", results);
    
    // Output the results
    console.log("Total number of ways to achieve the target sum: " + results.length);
    console.log("Valid combinations are:");
    results.forEach(combo => console.log(combo)); // Print each valid combination
}

// Example usage
const arr = [-1, 9, 8, -3, 4];
const targetSumValue = 5;
targetSum(arr, targetSumValue);
