'use strict';

module.exports = [
  // Challenge 1
  input => {
    return Array.from<string>(input)
      .filter(a => a.match(/^[0-9]$/))
      .map(a => parseInt(a, 10))
      .filter((number, index, arr) => number === arr[(index + 1) % arr.length])
      .reduce((a, b) => a + b);
  },
  input => {
    return Array.from<string>(input)
      .filter(a => a.match(/^[0-9]$/))
      .map(a => parseInt(a, 10))
      .filter((number, index, arr) => number === arr[(index + (arr.length / 2)) % arr.length])
      .reduce((a, b) => a + b);
  }

];
