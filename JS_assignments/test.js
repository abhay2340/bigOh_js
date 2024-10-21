// // function flattenObject(obj, parentKey = '', result = {}) {
// //   for (let key in obj) {
// //     // if (obj.hasOwnProperty(key)) {
// //       const newKey = parentKey ? `${parentKey}.${key}` : key;

// //       if (typeof obj[key] === 'object' && obj[key] !== null ) {
// //         // Recursively flatten if the value is an object
// //         flattenObject(obj[key], newKey, result);
// //       } else {
// //         // Add the key and value to the result
// //         result[newKey] = obj[key];
// //       }
// //     // }
// //   }
// //   return result;
// // }

// // const nestedObj = {
// //   name: "John",
// //   address: {
// //     street: "123 Main St",
// //     city: "New York",
// //     coordinates: {
// //       lat: 40.7128,
// //       long: -74.0060
// //     }
// //   },
// //   hobbies: ["reading", "gaming"],
// // };
// // // Example usage:
// // const flatObj = flattenObject(nestedObj);
// // console.log(flatObj);

// //

// // console.log("first");

// // (async function () {
// //   console.log("waiting for timeout");
// //   await new Promise((resolve) => {
// //     setTimeout(() => {
// //       console.log("hello");
// //       resolve();  // Resolve the promise after 5 seconds
// //     }, 5000);
// //   });
  
// //   console.log("second"); // This will execute after "hello"
// // })();

// // let promise = new Promise(function(resolve, reject) {
// //   // the function is executed automatically when the promise is constructed

// //   // after 1 second signal that the job is done with the result "done"
// //   setTimeout(() => resolve("done"), 1000);
// // })

// // promise.then(()=>{
// //   console.log("Work done")
// // })

// let promise = new Promise(function(resolve, reject) {
//   setTimeout(() => resolve("done!"), 1000);
// });

// // resolve runs the first function in .then
// promise.then(
//   result => console.log(result), // shows "done!" after 1 second
//   error => console.log(error) // doesn't run
// );

class EventEmitter {
  constructor() {
    // Object to store events and their listeners
    this.events = {};
  }

  // Method to add a listener for a specific event
  on(event, listener) {
    // If the event doesn't exist, create an array for it
    if (!this.events[event]) {
      this.events[event] = [];
    }
    // Add the listener to the array
    this.events[event].push(listener);
  }

  // Method to remove a listener for a specific event
  off(event, listenerToRemove) {
    if (!this.events[event]) return;

    // Filter out the listener we want to remove
    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }

  // Method to emit an event and call all the listeners for that event
  emit(event, ...args) {
    if (!this.events[event]) return;

    // Call each listener and pass any additional arguments to it
    this.events[event].forEach(listener => {
      listener(...args);
    });
  }

  // Method to add a listener that is only called once
  once(event, listener) {
    // Define a wrapper function to remove the listener after it's called
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper); // Remove the listener after it's called
    };

    // Register the wrapper function as the listener
    this.on(event, wrapper);
  }
}

// Create an instance of EventEmitter
const emitter = new EventEmitter();

// Listener function
const greetListener = (name) => {
  console.log(`Hello, ${name}`);
};

// Register the listener for the 'greet' event
emitter.on('greet', greetListener);

// Emit the 'greet' event
emitter.emit('greet', 'Alice');  // Output: Hello, Alice

// Remove the listener
emitter.off('greet', greetListener);

// Emit again, but no output this time since the listener has been removed
emitter.emit('greet', 'Bob');

// Register a one-time listener
emitter.once('shout', (msg) => {
  console.log(`Shouting: ${msg}`);
});

// Emit the 'shout' event
emitter.emit('shout', 'Hello World!');  // Output: Shouting: Hello World!

// Emitting again won't do anything since it's a one-time listener
emitter.emit('shout', 'Hello Again!');
