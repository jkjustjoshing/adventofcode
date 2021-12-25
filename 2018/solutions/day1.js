'use strict';

module.exports = [
  // Challenge 1
  input => {
    return input
      .trim()
      .split('\n')
      .map(r => parseInt(r, 10))
      .reduce((a,b) => a + b)
  },
  input => {
    let track = {}

    let numbers = input
      .trim()
      .split('\n')
      .map(r => parseInt(r, 10))

    let acc = 0
    while (true) {
      for(let i = 0; i < numbers.length; ++i) {
        acc += numbers[i]
        if (track[acc]) {
          return acc
        }
        track[acc] = true
      }
    }
    return 'ERROR'
  }

];
