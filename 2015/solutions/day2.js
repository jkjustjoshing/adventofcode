'use strict';

// Input format "12x12x12"

function getDimensions (input) {
  return input.trim().split('\n').map(line => {
    return line.split('x').map(item => parseInt(item));
  });
}

function getNeededPaper (dimensions) {
  let side1 = dimensions[0]*dimensions[1],
      side2 = dimensions[0]*dimensions[2],
      side3 = dimensions[1]*dimensions[2];

  let smallest = Math.min(side1, side2, side3);
  return 2 * (side1 + side2 + side3) + smallest;
}

function getVolume (dimensions) {
  return dimensions[0] * dimensions[1] * dimensions[2];
}

function getSmallestPerimeter (dimensions) {
  let sum = dimensions.reduce((a, b) => a + b);
  return 2 * (sum - Math.max(...dimensions));
}

module.exports = [
  // Challenge 1
  input => {
    let items = getDimensions(input);
    return items.map(getNeededPaper).reduce((a, b) => a + b);
  },
  input => {
    return getDimensions(input).reduce((sum, item) => {
      sum = sum + getSmallestPerimeter(item) + getVolume(item);
      return sum;
    }, 0);
  }

];
