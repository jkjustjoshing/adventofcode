'use strict';

let _ = require('lodash');

function getSubstrLength(passedString, passedChars) {
  let string;
  if (passedChars) {
    string = '';
    let count = 0;
    let cursor = 0;
    while(count < passedChars) {
      let match = passedString.substr(cursor).match(/^(\(\d+x\d+\))/);
      string += passedString[cursor] || '';
      cursor++;
      count++;
    }
  }
  else {
    string = passedString;
  }
  let output = 0;

  let cursor = 0;
  while (cursor < string.length) {
    let match = string.substr(cursor).match(/^\((\d+)x(\d+)\)/);
    if (match) {
      let chars = parseInt(match[1]);
      let repeat = parseInt(match[2]);

      let repeater = '(' + match[1] + 'x' + match[2] + ')';
      let substr = getSubstrLength(string.substr(cursor + repeater.length), chars);

      output += substr*repeat;

      cursor += (chars + repeater.length);
    }
    else {
      output++;
      cursor++;
      continue;
    }
  }
  return output;
}

module.exports = [
  // Challenge 1
  input => {
    input = input.replace(/\s/g, '');

    let output = '';

    let cursor = 0;
    while (cursor < input.length) {
      let match = input.substr(cursor).match(/^\((\d+)x(\d+)\)/);
      if (match) {
        let chars = parseInt(match[1]);
        let repeat = parseInt(match[2]);

        let repeater = '(' + match[1] + 'x' + match[2] + ')';
        let substr = input.substr(cursor + repeater.length, chars);
        for (let i = 0; i < repeat; ++i) {
          output += substr;
        }

        cursor += (chars + repeater.length);
      }
      else {
        output += input[cursor];
        cursor++;
        continue;
      }
    }

    return output.length;
  },

  // Challenge 2
  input => {
    input = input.replace(/\s/g, '');
    return getSubstrLength(input, input.length);
  }

];
