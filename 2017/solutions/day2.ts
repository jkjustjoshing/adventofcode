'use strict';

let max = (row: number[]): number => {
  return row.reduce((a, b) => a < b ? b : a);
};
let min = (row: number[]): number => {
  return row.reduce((a, b) => a > b ? b : a);
};

let factor = (row: number[]): number => {
  for (let i = 0; i < row.length; ++i) {
    for (let j = 0; j < row.length; ++j) {
      if (i === j) continue;
      if (row[i] % row[j] === 0) return row[i] / row[j];
      if (row[j] % row[i] === 0) return row[j] / row[i];
    }
  }
}

module.exports = [
  // Challenge 1
  (input: string) => {
    return input.trim().split('\n')
      .map(row => row.split('\t').map(a => parseInt(a, 10)))
      .map(row => max(row) - min(row))
      .reduce((a, b) => a + b);
  },
  (input: string) => {
    return input.trim().split('\n')
      .map(row => row.split('\t').map(a => parseInt(a, 10)))
      .map(row => factor(row))
      .reduce((a, b) => a + b);
  },


];
