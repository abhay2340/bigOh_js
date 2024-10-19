class Calculator {
    // Method to calculate the area of a circle
    static areaOfCircle(radius) {
        if (radius < 0) {
            return "Error: Radius cannot be negative.";
        }
        return Math.PI * Math.pow(radius, 2);
    }

    // Method to calculate square
    static square(number) {
        return number * number;
    }

    // Method to calculate square root
    static squareRoot(number) {
        if (number < 0) {
            return "Error: Cannot calculate square root of a negative number.";
        }
        return Math.sqrt(number);
    }

    // Method to calculate logarithm
    static logarithm(base, number) {
        if (number <= 0) {
            return "Error: Logarithm undefined for non-positive numbers.";
        }
        return Math.log(number) / Math.log(base);
    }

    // Method to calculate natural logarithm (ln)
    static naturalLog(number) {
        if (number <= 0) {
            return "Error: ln undefined for non-positive numbers.";
        }
        return Math.log(number);
    }

    // Method to calculate sine, cosine, and tangent
    static trigonometricFunction(func, angle) {
        const radians = this.toRadians(angle);
        switch (func) {
            case 'sin':
                return Math.sin(radians);
            case 'cos':
                return Math.cos(radians);
            case 'tan':
                return Math.tan(radians);
            default:
                return "Error: Invalid trigonometric function.";
        }
    }

    // Method to convert degrees to radians
    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Method to calculate X to the power of Y
    static power(base, exponent) {
        return Math.pow(base, exponent);
    }

    // Method to convert infix expression to postfix
    static infixToPostfix(expression) {
        const output = [];
        const stack = [];
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '^': 3,
            '(': 0
        };

        expression = expression.split(' ').filter(token => token); // Split and filter spaces

        for (let token of expression) {
            if (!isNaN(token)) {
                output.push(token); // If it's a number, add to output
            } else if (token === '(') {
                stack.push(token); // Push '(' onto the stack
            } else if (token === ')') {
                while (stack.length && stack[stack.length - 1] !== '(') {
                    output.push(stack.pop()); // Pop until '('
                }
                stack.pop(); // Pop '('
            } else {
                // While the precedence of the current token is less than or equal to the precedence of the top of the stack
                while (stack.length && precedence[token] <= precedence[stack[stack.length - 1]]) {
                    output.push(stack.pop());
                }
                stack.push(token); // Push the current token onto the stack
            }
        }

        while (stack.length) {
            output.push(stack.pop()); // Pop all operators from the stack
        }

        return output.join(' '); // Return the postfix expression
    }

    // Method to evaluate postfix expression
    static evaluatePostfix(postfix) {
        const stack = [];
        const tokens = postfix.split(' ');

        for (let token of tokens) {
            if (!isNaN(token)) {
                stack.push(parseFloat(token)); // Push numbers onto the stack
            } else {
                const b = stack.pop();
                const a = stack.pop();
                let result;
                switch (token) {
                    case '+':
                        result = a + b;
                        break;
                    case '-':
                        result = a - b;
                        break;
                    case '*':
                        result = a * b;
                        break;
                    case '/':
                        if (b === 0) return "Error: Division by zero.";
                        result = a / b;
                        break;
                    case '^':
                        result = Math.pow(a, b);
                        break;
                }
                stack.push(result); // Push the result back onto the stack
            }
        }

        return stack.pop(); // The final result will be the only element in the stack
    }
}

// Example Usage
console.log("Area of Circle (radius = 7):", Calculator.areaOfCircle(5)); // Output: 78.53981633974483
console.log("Square of 4:", Calculator.square(4)); // Output: 16
console.log("Square root of 16:", Calculator.squareRoot(16)); // Output: 4
console.log("Square root of -1:", Calculator.squareRoot(-1)); // Output: Error: Cannot calculate square root of a negative number.
console.log("Log base 10 of 100:", Calculator.logarithm(10, 100)); // Output: 2
console.log("Natural log of 2:", Calculator.naturalLog(2)); // Output: 0.6931471805599453
console.log("sin(30):", Calculator.trigonometricFunction('sin', 30)); // Output: 0.49999999999999994
console.log("cos(60):", Calculator.trigonometricFunction('cos', 60)); // Output: 0.5000000000000001
console.log("tan(45):", Calculator.trigonometricFunction('tan', 45)); // Output: 0.9999999999999999
console.log("2 to the power of 3:", Calculator.power(2, 3)); // Output: 8

// Infix to Postfix conversion and evaluation
const infixExpression = "3 + 5 * ( 2 - 8 ) ^ 2";
const postfixExpression = Calculator.infixToPostfix(infixExpression);
console.log("Postfix Expression:", postfixExpression); // Output: "3 5 2 8 - 2 ^ +"
console.log("Evaluation Result:", Calculator.evaluatePostfix(postfixExpression)); // Output: "3 + 5 * 36"
