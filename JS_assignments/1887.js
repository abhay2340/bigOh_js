function generateQueryString(obj, baseURL) {
    // Create an array to hold query string parts
    const queryStringParts = [];

    // Iterate over the object keys
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            queryStringParts.push(`${key}=${obj[key]}`);
        }
    }

    // Join the query string parts with '&' and construct the final URL
    const queryString = queryStringParts.join('&');
    return `${baseURL}?${queryString}`;
}

// Example usage
const inputObject = {
    "keyOne": "value One",
    "keyTwo": "value Two",
    "keyThree": "value Three",
};

const url = "https://localhost:400";
const result = generateQueryString(inputObject, url);

console.log(result); // Output: https://localhost:400?keyOne=value One&keyTwo=value Two&keyThree=value Three
