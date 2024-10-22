class MyPromise {
  // Constructor takes an executor function as an argument
  constructor(executor) {
    // Initial state of the promise is 'pending'
    this.state = "pending";

    // 'value' will store the result when the promise is fulfilled
    this.value = undefined;

    // 'reason' will store the reason if the promise is rejected
    this.reason = undefined;

    // These arrays store callbacks for then() and catch() to handle asynchronous behavior
    this.onFulfilledCallbacks = []; // Callbacks for success (fulfillment)
    this.onRejectedCallbacks = []; // Callbacks for failure (rejection)

    // A flag to ensure that the promise is only resolved or rejected once
    let isSettled = false;

    // The 'resolve' function is called when the promise succeeds
    const resolve = (value) => {
      // Prevent further state changes once the promise has settled
      if (this.state !== "pending" || isSettled) return;
      isSettled = true; // Mark the promise as settled to prevent further calls

      // Set the state to 'fulfilled' and store the value
      this.state = "fulfilled";
      this.value = value;

      // Execute all stored success callbacks
      this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
    };

    // The 'reject' function is called when the promise fails
    const reject = (reason) => {
      // Prevent further state changes once the promise has settled
      if (this.state !== "pending" || isSettled) return;
      isSettled = true; // Mark the promise as settled to prevent further calls

      // Set the state to 'rejected' and store the reason
      this.state = "rejected";
      this.reason = reason;

      // Execute all stored failure callbacks
      this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
    };

    // Execute the executor function that was passed to the constructor
    // with 'resolve' and 'reject' as arguments
    try {
      executor(resolve, reject); // If the executor succeeds, 'resolve' will be called
    } catch (error) {
      // If the executor throws an error, 'reject' will be called
      reject(error);
    }
  }

  // The 'then' method allows us to add callbacks for success and failure
  then(onFulfilled, onRejected) {
    // 'then' returns a new promise, which allows chaining
    return new MyPromise((resolve, reject) => {
      // If the promise has already been fulfilled, handle it synchronously
      if (this.state === "fulfilled") {
        try {
          // If 'onFulfilled' is provided, call it with the promise's value
          const result = onFulfilled ? onFulfilled(this.value) : this.value;
          // Resolve the new promise with the result
          resolve(result);
        } catch (error) {
          // If an error occurs, reject the new promise
          reject(error);
        }
      }

      // If the promise has already been rejected, handle it synchronously
      if (this.state === "rejected") {
        try {
          // If 'onRejected' is provided, call it with the rejection reason
          const result = onRejected ? onRejected(this.reason) : this.reason;
          // Resolve the new promise with the result (even on rejection, per Promises/A+ spec)
          resolve(result);
        } catch (error) {
          // If an error occurs, reject the new promise
          reject(error);
        }
      }

      // If the promise is still pending, store the callbacks for later execution
      if (this.state === "pending") {
        // Push fulfillment handler to the fulfillment callbacks array
        this.onFulfilledCallbacks.push(() => {
          try {
            // Call the 'onFulfilled' function (if provided) when the promise is resolved
            const result = onFulfilled ? onFulfilled(this.value) : this.value;
            // Resolve the new promise with the result
            resolve(result);
          } catch (error) {
            // If an error occurs, reject the new promise
            reject(error);
          }
        });

        // Push rejection handler to the rejection callbacks array
        this.onRejectedCallbacks.push(() => {
          try {
            // Call the 'onRejected' function (if provided) when the promise is rejected
            const result = onRejected ? onRejected(this.reason) : this.reason;
            // Resolve the new promise with the result (even on rejection)
            resolve(result);
          } catch (error) {
            // If an error occurs, reject the new promise
            reject(error);
          }
        });
      }
    });
  }

  // The 'catch' method is a shorthand for adding a rejection handler
  catch(onRejected) {
    // Simply calls 'then' with 'null' for onFulfilled, and the provided 'onRejected'
    return this.then(null, onRejected);
  }

  // Static method to create a promise that resolves immediately
  static resolve(value) {
    // Returns a new promise that resolves with the given value
    return new MyPromise((resolve) => resolve(value));
  }

  // Static method to create a promise that rejects immediately
  static reject(reason) {
    // Returns a new promise that rejects with the given reason
    return new MyPromise((_, reject) => reject(reason));
  }
}

// Example usage
const promise = new MyPromise((resolve, reject) => {
  // Asynchronous behavior: resolve the promise after 1 second
  setTimeout(() => {
    resolve("Resolved!");
    // Even though 'resolve' is called twice, only the first call takes effect
    resolve("This will be ignored."); // Ignored due to isSettled flag
  }, 1000);
});

// Attach a 'then' handler to log the result once the promise is fulfilled
promise
  .then((value) => console.log(value))
  .catch((err) => {
    console.log(err);
  }); 