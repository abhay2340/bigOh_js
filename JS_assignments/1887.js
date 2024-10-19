function generateQueryString(obj, baseURL) {
    // Create an array to hold query string parts
    const queryStringParts = [];

    // Iterate over the object keys
    for (const key in obj) {
        // Check if the key is a property of the object (not inherited)
        if (obj.hasOwnProperty(key)) {
            // Encode the key and value to make them safe for URLs
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(obj[key]);
            // Push the encoded key-value pair to the array
            queryStringParts.push(`${encodedKey}=${encodedValue}`);
        }
    }

    // Join the query string parts with '&' to form the complete query string
    const queryString = queryStringParts.join('&');
    
    // Return the final URL with the base URL and query string
    return `${baseURL}?${queryString}`;
}

// Example usage
const inputObject = {
    "keyOne": "value One",
    "keyTwo": "value Two",
    "keyThree": "value Three",
};

// Base URL for the query
const url = "https://localhost:400";

// Generate the query string URL
const result = generateQueryString(inputObject, url);

// Log the result to the console
console.log(result); 
// Output: https://localhost:400?keyOne=value%20One&keyTwo=value%20Two&keyThree=value%20Three
