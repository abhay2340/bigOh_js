
// let expression = "1+(2+3)*4-10/2";
let expression = "3+4*2/(5-1)";
console.log(eval(expression)); // To compare with eval()

// Split the expression into numbers, parentheses, and operators
let splitString = expression.match(/\d+|[()+\-*/]/g);

// Operator precedence
const precedence = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2
};

// Function to perform arithmetic operations
function performOperation(operator, b, a) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
  }
}

// Function to evaluate the expression
function evaluateExpression(splitString) {
  let operands = [];
  let operators = [];

  for (let element of splitString) {
    if (!isNaN(element)) {
      // If the element is a number, push it onto the operands stack
      operands.push(element);
    } else if (element === '(') {
      // If it's an opening parenthesis, push it onto the operators stack
      operators.push(element);
    } else if (element === ')') {
      // Evaluate the expression inside the parentheses
      while (operators.length && operators[operators.length - 1] !== '(') {
        let operator = operators.pop();
        let secondOp = operands.pop();
        let firstOp = operands.pop();
        operands.push(performOperation(operator, secondOp, firstOp));
      }
      operators.pop(); // Pop the '(' from the operators stack
    } else if (['+', '-', '*', '/'].includes(element)) {
      // Handle operator precedence
      while (operators.length && precedence[operators[operators.length - 1]] >= precedence[element]) {
        let operator = operators.pop();
        let secondOp = operands.pop();
        let firstOp = operands.pop();
        operands.push(performOperation(operator, secondOp, firstOp));
      }
      operators.push(element); // Push the current operator
    }
  }

  // After the loop, apply any remaining operators
  while (operators.length) {
    let operator = operators.pop();
    let secondOp = operands.pop();
    let firstOp = operands.pop();
    operands.push(performOperation(operator, secondOp, firstOp));
  }

  // The final result is in the operands stack
  return operands.pop();
}

console.log("Result from custom evaluation:", evaluateExpression(splitString));
