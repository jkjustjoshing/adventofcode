'use strict';

function redistributeBlocks (input: number[]): number[] {
  let max = input.reduce((a, b, index) => {
    if (a.number < b) {
      return { number: b, index: index };
    }
    return a;
  }, { number: -Infinity, index: -1 });

  let blocks = max.number;
  let newArray = [ ...input ];

  newArray[max.index] = 0;
  for (let blocks = max.number, index = (max.index + 1) % newArray.length; blocks > 0; index = (index + 1) % newArray.length) {
    newArray[index]++;
    blocks--;
  }
  return newArray;
}

function getNumbers (input: string): number[] {
  return input.trim()
    .replace(/\t/g, ' ')
    .split(' ')
    .map(a => parseInt(a.trim(), 10));
}

module.exports = [
  // Challenge 1
  (input: string) => {
    let items = getNumbers(input);

    let history = {};
    let repNumber = 0;

    while (true) {
      var key = items.join(',');
      if (history[key]) {
        return repNumber;
      }
      history[key] = true;
      repNumber++;
      items = redistributeBlocks(items);
    }
  },
  // Challenge 2
  (input: string) => {
    let items = getNumbers(input);

    let history = {};
    let repNumber = 0;

    while (true) {
      var key = items.join(',');
      if (typeof history[key] === 'number') {
        return repNumber - history[key];
      }
      history[key] = repNumber;
      repNumber++;
      items = redistributeBlocks(items);
    }
  }
];
