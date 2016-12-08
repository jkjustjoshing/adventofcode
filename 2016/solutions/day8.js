'use strict';

let _ = require('lodash');

class Screen {
  constructor ({ width, height }) {
    this.width = width;
    this.height = height;
    this.screen = _.times(this.width, () => _.times(this.height, false));
  }

  print () {
    console.log();
    for(let i = 0; i < this.height; ++i) {
      console.log(this.screen.map(col => col[i] ? 'X' : ' ').join(''));
    }
  }

  rect (width, height) {
    width = this.width > width ? width : this.width;
    height = this.height > height ? height : this.height;

    for (let w = 0; w < width; ++w) {
      for (let h = 0; h < height; ++h) {
        this.screen[w][h] = true;
      }
    }
  }

  rotateRow (row, count) {
    let amount = count % this.width;

    if (row >= this.height) {
      throw new Error('Row must be less than height');
    }

    let values = this.screen.map(col => col[row]);
    for(let i = 0; i < amount; ++i) {
      let item = values.pop();
      values.unshift(item);
    }
    this.screen.map((col, index) => col[row] = values[index]);
  }

  rotateCol (col, count) {
    let amount = count % this.height;

    if (col >= this.width) {
      throw new Error('Col must be less than width');
    }

    let values = this.screen[col];
    for(let i = 0; i < amount; ++i) {
      let item = values.pop();
      values.unshift(item);
    }
    this.screen[col] = values;
  }
}

function parseInstructions (input) {
  return input.trim().split('\n').map(row => {
    let instr, param1, param2, sections = row.split(' ');
    if (sections[0] === 'rect') {
      instr = 'rect';
      let params = sections[1].match(/(\d+)x(\d+)/);
      param1 = params[1];
      param2 = params[2];
    }
    else if (sections[0] === 'rotate') {
      if (sections[1] === 'column') {
        instr = 'rotateCol';
      }
      else if (sections[1] === 'row') {
        instr = 'rotateRow';
      }
      param1 = sections[2].match(/(?:x|y)=(\d+)/)[1];
      param2 = sections[4];
    }

    param1 = parseInt(param1, 10);
    param2 = parseInt(param2, 10);

    return [ instr, param1, param2 ];
  });
}

module.exports = [
  // Challenge 1
  input => {
    let instructions = parseInstructions(input);
    let screen = new Screen({ width: 50, height: 6 });
    instructions.map(instruction => screen[instruction[0]](instruction[1], instruction[2]));

    return screen.screen.reduce((sum, col) => col.reduce((sum, cell) => cell ? sum + 1 : sum , 0) + sum, 0);
  },

  // Challenge 2
  input => {
    let instructions = parseInstructions(input);
    let screen = new Screen({ width: 50, height: 6 });
    instructions.map(instruction => screen[instruction[0]](instruction[1], instruction[2]));
    screen.print();
  }

];
