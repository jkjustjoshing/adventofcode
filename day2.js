'use strict';

// Input format "DRLLLRU"
function getBathroomCode (keypad, input) {
  let instructions = input.trim().split('\n').map(str => Array.from(str));

  let cursor = [0, 0];
  // Find "5"
  keypad.map((row, rowIndex) => {
    row.map((key, keyIndex) => {
      if (key === 5) {
        cursor = [ rowIndex, keyIndex ];
      }
    });
  });

  return instructions.map(directions => {
    directions.map(item => {
      let futureCursor = [...cursor];
      switch(item) {
        case 'U':
          futureCursor[0]--;
          break;
        case 'L':
          futureCursor[1]--;
          break;
        case 'R':
          futureCursor[1]++;
          break;
        case 'D':
          futureCursor[0]++;
          break;
      }
      if (keypad[futureCursor[0]] && keypad[futureCursor[0]][futureCursor[1]]) {
        cursor = futureCursor;
      }
    });
    return keypad[cursor[0]][cursor[1]];
  });

}

module.exports = [
  // Challenge 1
  input => {
    let keypad = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    return getBathroomCode(keypad, input);
  },

  // Challenge 2
  input => {
    let keypad = [
      [null, null, 1,    null, null],
      [null, 2,    3,    4,    null],
      [5,    6,    7,    8,    9],
      [null, 'A',  'B',  'C',  null],
      [null, null, 'D',  null, null]
    ];

    return getBathroomCode(keypad, input);
  }

];
