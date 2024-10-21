function rotateMatrixClockwise(matrix) {
    const n = matrix.length;

    // Step 1: Transpose the matrix (swap rows with columns)
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // Step 2: Reverse each row to rotate 90 degrees clockwise
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }

    return matrix;
}


let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("Original Matrix:");
console.log(matrix);

let rotatedMatrix = rotateMatrixClockwise(matrix);

console.log("Matrix after 90-degree clockwise rotation:");
console.log(rotatedMatrix);
