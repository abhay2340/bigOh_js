// function flattenObject(obj, parentKey = '', result = {}) {
//   for (let key in obj) {
//     // if (obj.hasOwnProperty(key)) {
//       const newKey = parentKey ? `${parentKey}.${key}` : key;

//       if (typeof obj[key] === 'object' && obj[key] !== null ) {
//         // Recursively flatten if the value is an object
//         flattenObject(obj[key], newKey, result);
//       } else {
//         // Add the key and value to the result
//         result[newKey] = obj[key];
//       }
//     // }
//   }
//   return result;
// }

// const nestedObj = {
//   name: "John",
//   address: {
//     street: "123 Main St",
//     city: "New York",
//     coordinates: {
//       lat: 40.7128,
//       long: -74.0060
//     }
//   },
//   hobbies: ["reading", "gaming"],
// };
// // Example usage:
// const flatObj = flattenObject(nestedObj);
// console.log(flatObj);

//

// console.log("first");

// (async function () {
//   console.log("waiting for timeout");
//   await new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("hello");
//       resolve();  // Resolve the promise after 5 seconds
//     }, 5000);
//   });
  
//   console.log("second"); // This will execute after "hello"
// })();

// let promise = new Promise(function(resolve, reject) {
//   // the function is executed automatically when the promise is constructed

//   // after 1 second signal that the job is done with the result "done"
//   setTimeout(() => resolve("done"), 1000);
// })

// promise.then(()=>{
//   console.log("Work done")
// })

let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise.then(
  result => console.log(result), // shows "done!" after 1 second
  error => console.log(error) // doesn't run
);