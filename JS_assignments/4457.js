function deepClone(obj) {
    // Check if obj is null or not an object/array
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Handle Date objects
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    // Handle Arrays
    if (Array.isArray(obj)) {
        const cloneArray = [];
        for (let i = 0; i < obj.length; i++) {
            cloneArray[i] = deepClone(obj[i]);
        }
        return cloneArray;
    }

    // Handle Objects
    const cloneObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key]);
        }
    }

    return cloneObj;
}

// Example usage
const originalObject = {
    name: "Abhay",
    age: 30,
    skills: ["JavaScript", "React", "Node.js"],
    address: {
        city: "Delhi",
        postalCode: 10001
    },
    birthdate: new Date("1995-08-25")
};

const clonedObject = deepClone(originalObject);

console.log(clonedObject); // Deep cloned object
console.log(clonedObject === originalObject); // false (not the same reference)
console.log(clonedObject.address === originalObject.address); // false (deeply cloned)
