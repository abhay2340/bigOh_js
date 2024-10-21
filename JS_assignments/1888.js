function assertObjectsEqual(actual, expected, message) {
    // Helper function to check if two objects are equal
    function objectsEqual(obj1, obj2) {
        // Check if both are objects
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
            return false;
        }

        // Get keys from both objects
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        // Check if they have the same number of keys
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Check if all keys and values are equal
        for (const key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }

        return true;
    }

    // Check equality and prepare output
    if (objectsEqual(actual, expected)) {
        return `Passed: ${message}`;
    } else {
        return `FAILED Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`;
    }
}

// Example usage
var expected1 = { foo: 5, bar: 6 };
var actual1 = { foo: 5, bar: 6 };
console.log(assertObjectsEqual(actual1, expected1, 'detects that two objects are equal')); // Output: Passed: detects that two objects are equal

var expected2 = { foo: 6, bar: 5 };
var actual2 = { foo: 5, bar: 6 };
console.log(assertObjectsEqual(actual2, expected2, 'detects that two objects are equal')); // Output: FAILED Expected {"foo":6,"bar":5}, but got {"foo":5,"bar":6}
