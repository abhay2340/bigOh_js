function calculator(operation, ...numbers) {
    // Check if any numbers were provided
    if (numbers.length === 0) {
        return "No numbers provided."; // Return an error message if no numbers are supplied
    }

    // Switch case to handle different operations
    switch (operation) {
        case 'add':
            // Use reduce to sum all numbers, starting from 0
            return numbers.reduce((acc, num) => acc + num, 0);
        case 'subtract':
            // Use reduce to subtract each subsequent number from the first
            return numbers.reduce((acc, num) => acc - num);
        case 'multiply':
            // Use reduce to multiply all numbers, starting from 1
            return numbers.reduce((acc, num) => acc * num, 1);
        case 'divide':
            // Use reduce to divide the first number by each subsequent number
            // Note: Care should be taken as this could lead to division by zero
            return numbers.reduce((acc, num) => {
                if (num === 0) {
                    throw new Error("Division by zero is not allowed."); // Handle division by zero
                }
                return acc / num;
            });
        default:
            // Return an error message for unsupported operations
            return "Invalid operation."; 
    }
}

// Example usage:
console.log(calculator('add', 9, 4, 12, 16, 23, 43));       // Output: 107
console.log(calculator('subtract', 100, 20, 10));           // Output: 70
console.log(calculator('multiply', 2, 3, 4));               // Output: 24
console.log(calculator('divide', 100, 5, 2));               // Output: 10
// Uncomment the line below to see the error handling in action
// console.log(calculator('divide', 100, 0));               // Output: Error: Division by zero is not allowed.
