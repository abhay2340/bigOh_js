
// let obj={
//     "keyOne": "value One",
//     "keyTwo": "value Two",
//     "keyThree": "value Three",
//     "keyFour": {
//       "keyA": true,
//       "keyB": false,
//       "keyC": {
//         "keyCOne": "key C one value",
//         "keyCTwo": "key C two value",
//         "keyCThree": 1234
//       }
//     }
//   }
  
//   let myobj={};

//   function iterator(obj,myobj){

//   for(key  in obj){
//     if(typeof obj[key]==='object'){
//         console.log("first")
//         console.log(typeof key)
//         console.log(typeof myobj[key])
//         iterator(obj[key],myobj.key);
//     }
//     else{  
//         myobj[key]=obj[key];
//         console.log(myobj[key])
//     }
//   }
// }

// iterator(obj,myobj);

// console.log(myobj)



function evaluateExpression(expression) {
    // Step 1: Evaluate parentheses (if any)
    while (expression.includes('(')) {
      // Find the innermost parenthesis and evaluate it
      expression = expression.replace(/\([^()]*\)/g, function(subExpression) {
        return evaluateSimpleExpression(subExpression.slice(1, -1)); // Remove parentheses and evaluate
      });
    }
  
    // Step 2: Evaluate the final expression after resolving parentheses
    return evaluateSimpleExpression(expression);
  }
  
  // Helper function to evaluate simple expressions (no parentheses)
  function evaluateSimpleExpression(expression) {
    // Step 1: Handle multiplication and division first
    expression = expression.split(/(\*|\/)/).reduce((acc, curr, index, arr) => {
      if (curr === '*') {
        return acc * parseFloat(arr[++index]);
      } else if (curr === '/') {
        return acc / parseFloat(arr[++index]);
      } else {
        return acc === null ? parseFloat(curr) : acc;
      }
    }, null);
  
    // Step 2: Handle addition and subtraction
    return expression.split(/(\+|\-)/).reduce((acc, curr, index, arr) => {
      if (curr === '+') {
        return acc + parseFloat(arr[++index]);
      } else if (curr === '-') {
        return acc - parseFloat(arr[++index]);
      } else {
        return acc === null ? parseFloat(curr) : acc;
      }
    }, null);
  }
  
  // Example usage:
  const expression = "1+(2+3)*4-10/2";
  const result = evaluateExpression(expression);
  console.log(`The result of the expression '${expression}' is: ${result}`);
  