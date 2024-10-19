
function infixToPostfix(expression) {
  // Define operator precedence (higher value means higher precedence)
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const output = []; // Array to hold the final postfix expression
  const operators = []; // Stack to hold operators and parentheses

  // Split the input expression into tokens (numbers and operators)
  const splittedString = expression.match(/\d+|\+|\-|\*|\/|\(|\)/g);

  // Process each token
  splittedString.forEach(token => {
      // If the token is a number, add it to the output
      if (!isNaN(token)) {
          output.push(token);
      } 
      // If the token is '(', push it onto the operator stack
      else if (token === '(') {
          operators.push(token);
      } 
      // If the token is ')', pop from the stack to output until '(' is found
      else if (token === ')') {
          while (operators.length && operators[operators.length - 1] !== '(') {
              output.push(operators.pop());
          }
          operators.pop();  // Remove the '(' from the stack
      } 
      // If the token is an operator
      else {
          // Pop from the stack to output while the top of the stack has the same or higher precedence
          while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
              output.push(operators.pop());
          }
          // Push the current operator onto the stack
          operators.push(token);
      }
  });

  // Pop any remaining operators from the stack to output
  while (operators.length) {
      output.push(operators.pop());
  }

  return output; // Return the resulting postfix expression
}


function evaluatePostfix(postfix) {
  const stack = []; // Stack to hold numbers for evaluation

  // Process each token in the postfix expression
  postfix.forEach(token => {
      // If the token is a number, push it onto the stack
      if (!isNaN(token)) {
          stack.push(Number(token));
      } 
      // If the token is an operator, pop the two top numbers off the stack
      else {
          const right = stack.pop(); // Right operand
          const left = stack.pop(); // Left operand
          // Perform the operation based on the operator
          switch (token) {
              case '+': stack.push(left + right); break; // Addition
              case '-': stack.push(left - right); break; // Subtraction
              case '*': stack.push(left * right); break; // Multiplication
              case '/': stack.push(left / right); break; // Division
          }
      }
  });

  return stack.pop(); // The final result is the only number left on the stack
}


const expression = "3 + 5 * (2 + 1)";
const postfix = infixToPostfix(expression); // Convert the infix expression to postfix
const result = evaluatePostfix(postfix); // Evaluate the postfix expression
console.log("Postfix:", postfix.join(" "));  // Print the postfix expression
console.log("Result:", result);               // Print the result of the evaluation
