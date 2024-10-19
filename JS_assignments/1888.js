function assertObjectsEqual(actual, expected, message) {
  // Helper function to check if two objects are equal
  function objectsEqual(obj1, obj2) {
    // Check if both inputs are objects (and not null)
    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      obj1 === null ||
      obj2 === null
    ) {
      return false; // Return false if either is not an object
    }

    // Get the keys from both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if both objects have the same number of keys
    if (keys1.length !== keys2.length) {
      return false; // Return false if key lengths are different
    }

    // Check if all keys and their corresponding values are equal
    for (const key of keys1) {
        if(obj1[key]==obj2[key]&&typeof key=='object'&&key!=null){
                    assertObjectsEqual()
        }
      if (obj1[key] !== obj2[key]) {
        return false; // Return false if any key-value pair is not equal
      }
    }

    return true; // Return true if all checks pass
  }

  // Use the helper function to check equality and prepare output
  if (objectsEqual(actual, expected)) {
    return `Passed: ${message}`; // Return success message if objects are equal
  } else {
    return `FAILED Expected ${JSON.stringify(
      expected
    )}, but got ${JSON.stringify(actual)}`; // Return failure message with details
  }
}

// Example usage
var expected1 = {
  foo: 5,
  bar: 6,
  man: {
    ab: 2,
    bc: 3,
  },
}; // Expected object 1
var actual1 = {
  foo: 5,
  bar: 6,
  man: {
    ab: 2,
    bc: 3,
  },
}; // Actual object 1
console.log(
  assertObjectsEqual(actual1, expected1, "detects that two objects are equal")
);
// Output: Passed: detects that two objects are equal

var expected2 = { foo: 6, bar: 5 }; // Expected object 2
var actual2 = { foo: 5, bar: 6 }; // Actual object 2
console.log(
  assertObjectsEqual(actual2, expected2, "detects that two objects are equal")
);
// Output: FAILED Expected {"foo":6,"bar":5}, but got {"foo":5,"bar":6}
