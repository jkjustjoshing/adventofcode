'use strict';

function getTriangles (input) {
  let rowRegex = /^\s*(\d+)\s+(\d+)\s+(\d+)\s*$/;
  return input.trim().split('\n').map(row => {
    let [orig, ...match] = row.match(rowRegex);
    return match.map(item => parseInt(item));
  });
}

function getTrianglesVertical (input) {
  let rowRegex = /^\s*(\d+)\s+(\d+)\s+(\d+)\s*$/;
  let rows = input.trim().split('\n').map(row => {
    let [orig, ...match] = row.match(rowRegex);
    return match.map(item => parseInt(item));
  });

  let triangles = [];
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 3) {
    for(let colIndex = 0; colIndex < 3; ++colIndex) {
      triangles.push([rows[rowIndex][colIndex], rows[rowIndex + 1][colIndex], rows[rowIndex + 2][colIndex]]);
    }
  }
  return triangles;
}

function isTriangleValid (triangle) {
  if (triangle[0] + triangle[1] <= triangle[2]) return false;
  if (triangle[0] + triangle[2] <= triangle[1]) return false;
  if (triangle[1] + triangle[2] <= triangle[0]) return false;
  return true;
}

module.exports = [
  // Challenge 1
  input => {
    let triangles = getTriangles(input);

    let validTriangles = triangles.filter(triangle => isTriangleValid(triangle));

    return validTriangles.length;
  },

  // Challenge 2
  input => {
    let triangles = getTrianglesVertical(input);

    let validTriangles = triangles.filter(triangle => isTriangleValid(triangle));

    return validTriangles.length;
  }

];
