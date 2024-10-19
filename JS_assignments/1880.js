function calculator() {
    // Check if no arguments are provided
    if (arguments.length === 0) {
        return "No numbers provided.";
    }

    // The first argument is the operation
    const operation = arguments[0];
    // The rest of the arguments are the numbers
    const numbers = Array.from(arguments).slice(1);

    // Check if numbers array is empty after the operation
    if (numbers.length === 0) {
        return "No numbers provided.";
    }

    // Initialize the result with the first number for operations that require an initial value
    let result = numbers[0];

    switch (operation) {
        case 'add':
            return numbers.reduce((acc, num) => acc + num, 0);
        case 'subtract':
            return numbers.slice(1).reduce((acc, num) => acc - num, result);
        case 'multiply':
            return numbers.reduce((acc, num) => acc * num, 1);
        case 'divide':
            // Ensure no division by zero
            if (numbers.slice(1).includes(0)) {
                return "Error: Division by zero is not allowed.";
            }
            return numbers.slice(1).reduce((acc, num) => acc / num, result);
        case 'modulus':
            return numbers.slice(1).reduce((acc, num) => acc % num, result);
        default:
            return "Invalid operation.";
    }
}

// Example usage:
console.log(calculator('add', 9, 4, 12, 16, 23, 43));      
console.log(calculator('subtract', 100, 20, 10));          
console.log(calculator('multiply', 2, 3, 4));              
console.log(calculator('divide', 100, 5, 2));              
console.log(calculator('modulus', 10, 3, 2));              
console.log(calculator('divide', 10, 0));                  
