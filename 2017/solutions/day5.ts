'use strict';

module.exports = [
  // Challenge 1
  (input: string) => {
    var instructions = input.trim().split('\n').map(a => parseInt(a, 10));
    var pointer = 0;
    var steps = 0;
    while(pointer >= 0 && pointer < instructions.length) {
      let initPointer = pointer;
      pointer += instructions[initPointer];
      instructions[initPointer]++;
      steps++;
    }

    return steps;

  },
  (input: string) => {
    var instructions = input.trim().split('\n').map(a => parseInt(a, 10));
    var pointer = 0;
    var steps = 0;
    while(pointer >= 0 && pointer < instructions.length) {
      let initPointer = pointer;
      pointer += instructions[initPointer];
      if (instructions[initPointer] >= 3) {
        instructions[initPointer]--;
      } else {
        instructions[initPointer]++;
      }
      steps++;
    }

    return steps;

  }
];
