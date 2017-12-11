'use strict';

var noDuplicate = (words) => {
  var count = {};
  words.forEach(word => count[word] = (count[word] || 0) + 1);
  return Object.keys(count).map(key => count[key]).filter(a => a !== 1).length === 0;
};

module.exports = [
  // Challenge 1
  (input: string) => {
     return input.trim().split('\n').filter((row) => {
       return noDuplicate(row.trim().split(' '));
     }).length;
  },
  (input: string) => {
    return input.trim().split('\n').filter((row) => {
      var words = row.trim().split(' ').map(word => word.split('').sort().join(''));
      return noDuplicate(words);
    }).length;
  }
];
