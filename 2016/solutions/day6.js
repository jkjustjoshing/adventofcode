'use strict';

let _ = require('lodash');

function getLetterFrequency (input) {
  let chars = [];
  let length = input.indexOf('\n') + 1;
  for(let i = 0; i < length; ++i) {
    chars.push([]);
  }

  for(let i = 0; i < input.length; ++i) {
    chars[i % length].push(input[i]);
  }

  // Remove newlines
  chars.pop();

  return chars.map(slot => {
    let groups = _(slot).groupBy(slot => slot).value();
    Object.keys(groups).forEach(key => groups[key] = groups[key].length);
    return groups;
  });
}

module.exports = [
  // Challenge 1
  input => {
    return getLetterFrequency(input).map(freq => {
      let max = _(freq).map().max();
      return _.find(Object.keys(freq), key => freq[key] === max);
    }).join('');
  },

  // Challenge 2
  input => {
    return getLetterFrequency(input).map(freq => {
      let min = _(freq).map().min();
      return _.find(Object.keys(freq), key => freq[key] === min);
    }).join('');
  }

];
