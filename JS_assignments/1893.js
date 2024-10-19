// The calculator function accepts a function and a variable number of values
const calculator = (yourFunction, ...values) => {
  // Call the provided function with the values and return the result
  return yourFunction(...values);
};

// Function to convert temperature from Celsius to Fahrenheit
const temperatureConverter = (tempInCelsius) => {
  // Calculate and return the temperature in Fahrenheit using the conversion formula
  return ((9 / 5) * tempInCelsius + 32);
};

// Function to calculate the area of a rectangle
const calculateArea = (length, breadth) => {
  // Return the area by multiplying length and breadth
  return length * breadth;
};

// Example usage of the calculator function with calculateArea
console.log(calculator(calculateArea, 2, 3)); // Output: 6

// Example usage of the calculator function with temperatureConverter
console.log(calculator(temperatureConverter, 25)); // Output: 77
