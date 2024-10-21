// function deepClone(obj) {
//     if (obj === null || typeof obj !== 'object') {
//         return obj; // Return the value if obj is not an object
//     }

//     // Handle Date objects
//     if (obj instanceof Date) {
//         return new Date(obj);
//     }

//     // Handle Array objects
//     if (Array.isArray(obj)) {
//         return obj.map(item => deepClone(item));
//     }

//     // Handle Objects
//     const clonedObj = {};
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             clonedObj[key] = deepClone(obj[key]);
//         }
//     }
//     return clonedObj;
// }

// // Example usage:
// const original = { a: 1, b: { c: 2, d: [3, 4] }, e: new Date() };
// const cloned = deepClone(original);

// cloned.b.c = 5; // Modifying the clone
// console.log(original.b.c); // Output: 2 (original remains unchanged)
// console.log(cloned.b.c); // Output: 5 (clone is changed)
// console.log(original.e === cloned.e); // Output: false (different Date objects)


const original = { a: 1, b: { c: 2, d: [3, 4] }, e: new Date() };
const copy1={...original}; //shallow copy
const copy2=Object.assign({},original); //shallow copy
copy2.b.d[0]=10;
copy1.b.c=5;
console.log(original.b.c); // Output: 2 (original remains unchanged)
console.log(original.b.d[0]); // Output: 2 (original remains unchanged)