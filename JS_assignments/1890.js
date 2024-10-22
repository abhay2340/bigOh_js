function validateExpression(expression) {
    // Regular expression to match valid expressions (digits, whitespace, and operators)
    const validPattern = /^[\d\s+\-*/%()]*$/;
    if (!validPattern.test(expression)) {
        return "Invalid expression: contains invalid characters.";
    }
    return null; // Return null if the expression is valid
}

function calculate(expression) {
    // Validate the expression
    const validationError = validateExpression(expression);
    if (validationError) {
        return validationError;
    }

    // Helper function to get precedence of operators
    function getPrecedence(op) {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/' || op === '%') return 2;
        return 0; // Return 0 for non-operators
    }

    // Function to evaluate the top operation in the stack
    function evaluate(a, b, operator) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/':
                if (b === 0) return "Error: Division by zero is not allowed.";
                return a / b;
            case '%': return a % b;
            default: return 0; // Return 0 for unsupported operators (safety)
        }
    }

    const numbers = [];
    const operators = [];
    let currentNumber = '';
    let isNegative = false;

    // Parse the expression
    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        if (char === ' ') continue; // Skip whitespace

        // Check for negative numbers
        if (char === '-') {
            // If it is the first character or follows an operator or '('
            if (i === 0 || ['+', '-', '*', '/', '%', '('].includes(expression[i - 1])) {
                isNegative = true; // Mark the next number as negative
                continue; // Do not add '-' to the number
            }
        }

        // If the character is a digit or a decimal point, accumulate it into currentNumber
        if (!isNaN(char) || (char === '.' && currentNumber.length > 0)) {
            currentNumber += char;
        } else {
            // Push the current number to the stack if it's not empty
            if (currentNumber) {
                numbers.push(isNegative ? -parseFloat(currentNumber) : parseFloat(currentNumber));
                currentNumber = ''; // Reset current number
                isNegative = false; // Reset the negative flag
            }

            // Process operators and parentheses
            if (['+', '-', '*', '/', '%', '(', ')'].includes(char)) {
                if (char === '(') {
                    operators.push(char); // Push opening parenthesis
                } else if (char === ')') {
                    // Process until matching '('
                    while (operators.length && operators[operators.length - 1] !== '(') {
                        const operator = operators.pop();
                        const b = numbers.pop();
                        const a = numbers.pop();
                        numbers.push(evaluate(a, b, operator));
                    }
                    operators.pop(); // Pop the '('
                } else {
                    // Process operator precedence
                    while (
                        operators.length &&
                        getPrecedence(operators[operators.length - 1]) >= getPrecedence(char)
                    ) {
                        const operator = operators.pop();
                        const b = numbers.pop();
                        const a = numbers.pop();
                        numbers.push(evaluate(a, b, operator));
                    }
                    operators.push(char); // Push the current operator
                }
            }
        }
    }

    // Push the last number if any
    if (currentNumber) {
        numbers.push(isNegative ? -parseFloat(currentNumber) : parseFloat(currentNumber));
    }

    // Process remaining operators
    while (operators.length) {
        const operator = operators.pop();
        const b = numbers.pop();
        const a = numbers.pop();
        numbers.push(evaluate(a, b, operator));
    }
if(Number.isNaN( numbers[0])){
    console.log("this calcualtion could not be done due to some wrong input");
}
    // Check if we have exactly one result
    return numbers.length === 1 ? numbers[0] : "Invalid expression: incomplete calculation.";
}

// Example usage:
console.log(calculate("3 +5 * 2"));                 
console.log(calculate("10 + 2 * 6"));                
console.log(calculate("100 * 2 + 12"));               
console.log(calculate("100 * ( 2 + 12 )"));           
console.log(calculate("100 * ( 2 + 12 ) / 14"));      
console.log(calculate("10 / 0"));                    
console.log(calculate("-3 + 5"));                    
console.log(calculate("3 + -5"));                     
console.log(calculate("3 + (5 * -2)"));               
console.log(calculate("-3 + -5"));                    
console.log(calculate("3 + 5 * a"));                 
console.log(calculate("3 + (5 * 2"));               
console.log(calculate("3 + 5 *"));  
console.log(calculate(2));                   
