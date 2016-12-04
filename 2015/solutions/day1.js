'use strict';

// Input format "((()()()(((("

module.exports = [
  // Challenge 1
  input => {
    let items = Array.from(input);
    return items.reduce((floor, instr) => {
      if (instr === '(') return floor + 1;
      return floor - 1;
    }, 0);
  },
  input => {
    let items = Array.from(input);
    let index;
    items.reduce((floor, instr, currIndex) => {
      let returnVal;
      if (instr === '(') returnVal = floor + 1;
      else returnVal = floor - 1;

      if (returnVal < 0 && index === undefined) {
        index = currIndex;
      }
      return returnVal;
    }, 0);

    return index + 1;
  }

];
