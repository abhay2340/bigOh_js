// Function to sum all elements in a nested array
function sumNestedArray(arr) {
    // Flatten the array to a single level and then reduce it to find the sum
    return arr.flat(Infinity).reduce((sum, item) => sum + item, 0);
}

// Example usage of sumNestedArray
console.log(sumNestedArray([1, 2, [4, 5, [6, 8]]])); // Output: 26

// Variable to hold the cumulative sum
let sum = 0;

// Recursive function to calculate the sum of a nested array
let calc = (arr) => {
    // Iterate through each element in the array
    for (let x of arr) {
        // Check if the current element is an array
        if (Array.isArray(x)) {
            // If it is an array, call calc recursively to sum its elements
            calc(x);
        } else {
            // If it is not an array, add the value to the cumulative sum
            sum = sum + x;
        }
    }
}

// Example usage of the calc function
calc([1, 2, [4, 5, [6, 8]]]);
console.log(sum); // Output: 26
