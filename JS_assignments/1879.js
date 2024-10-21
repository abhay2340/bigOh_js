

function flattenObject(obj, prefix = '') {
    const flattened = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key; // Create new key with prefix

            // Check if the value is an object itself (and not null)
            if (typeof value === 'object' && value !== null) {
                const nestedFlattened = flattenObject(value, newKey);
                console.log(nestedFlattened)
                // Assign each property of the nested flattened object to the flattened object
                for (const nestedKey in nestedFlattened) {
                    if (nestedFlattened.hasOwnProperty(nestedKey)) {
                        flattened[nestedKey] = nestedFlattened[nestedKey];
                    }
                }
            } else {
                flattened[newKey] = value; // Assign the value to the new key
            }
        }
    }

    return flattened;
}


const nestedObject = {
        "keyOne": "value One",
        "keyTwo": "value Two",
        "keyThree": "value Three",
        "keyFour": {
          "keyA": true,
          "keyB": false,
          "keyC": {
            "keyCOne": "key C one value",
            "keyCTwo": "key C two value",
            "keyCThree": 1234
          }
        }
      }

// Flattening the nested object
const flatObject = flattenObject(nestedObject);
console.log(flatObject);


// console.log(flatObject.keyFour.keyA)