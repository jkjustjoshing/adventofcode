'use strict';

import * as _ from 'lodash';

function isValue (instr: ValueInstruction | BotInstruction): instr is ValueInstruction {
  return instr.isValue;
}

type Instruction = ValueInstruction | BotInstruction;

interface ValueInstruction {
  isValue: boolean;
  value: number;
  bot: number;
}
interface BotInstruction {
  isValue: boolean;
  bot: number;
  low: {
    bot: boolean,
    number: number
  };
  high: {
    bot: boolean,
    number: number
  };
}

function getInstructions (input: string): Instruction[] {
  return input.trim().split('\n').map(row => {
    if (row.indexOf('bot') === 0) {
      // bot row
      let match = row.match(/^bot (\d+) gives low to (.+) and high to (.+)$/);

      return {
        isValue: false,
        bot: parseInt(match[1], 10),
        low: {
          bot: match[2].indexOf('bot') === 0,
          number: parseInt(match[2].match(/(\d+)/)[1], 10)
        },
        high: {
          bot: match[3].indexOf('bot') === 0,
          number: parseInt(match[3].match(/(\d+)/)[1], 10)
        }
      };
    }
    else {
      // value row
      let match = row.match(/^value (\d+) goes to bot (\d+)$/);
      return {
        isValue: true,
        value: parseInt(match[1], 10),
        bot: parseInt(match[2], 10)
      };
    }
  });
}

class Bot {
  public number: number;
  private chips: [ number, number ];

  constructor (number) {
    this.number = number;
    this.chips = [null, null];
  }

  hold (number) {
    if (this.chips[0] == null) {
      this.chips[0] = number;
    }
    else if (this.chips[1] == null) {
      this.chips[1] = number;
    }
    else {
      throw new Error ('Bot ' + this.number + ' doesn\'t have room to hold chip ' + number);
    }
  }

  isFull (): boolean {
    return this.numberHeld() === 2;
  }

  numberHeld () {
    return this.chips.filter(chip => chip != null).length;
  }

  empty (): { low: number, high: number } {
    if (!this.isFull()) {
      throw new Error(`Bot ${this.number} is not full.`);
    }

    let toReturn = {
      low:  this.chips[0] < this.chips[1] ? this.chips[0] : this.chips[1],
      high: this.chips[0] < this.chips[1] ? this.chips[1] : this.chips[0]
    };
    this.chips = [ null, null ];
    return toReturn;
  }
}

class BotContainer {
  private bots: Bot[] = [];

  getItem (number: number) {
    if (this.bots.length - 1 < number) {
      for (let i = this.bots.length; i <= number; ++i) {
        this.bots.push(new Bot(i));
      }
    }
    return this.bots[number];
  }

  get length () {
    return this.bots.length;
  }

  allEmpty () {
    return this.bots.filter(bot => bot.numberHeld()).length === 0;
  }
}

class Output {
  private chips: number[] = [];
  private number: number;

  constructor (number: number) {
    this.number = number;
  }

  hold (number) {
    this.chips.push(number);
  }

  numberHeld () {
    return this.chips;
  }

  getChips () {
    return this.chips;
  }
}

class OutputContainer {
  private outputs: Output[] = [];

  getItem (number: number) {
    if (this.outputs.length - 1 < number) {
      for (let i = this.outputs.length; i <= number; ++i) {
        this.outputs.push(new Output(i));
      }
    }
    return this.outputs[number];
  }

  map<U>(callbackfn: (value: Output, index: number, array: Output[]) => U, thisArg?: any): U[] {
    return this.outputs.map<U>(callbackfn, thisArg);
  }

  get length () {
    return this.outputs.length;
  }
}

module.exports = [
  // Challenge 1
  input => {
    let outputs = new OutputContainer();
    let bots = new BotContainer();

    let instructions = getInstructions(input);
    let firstRun = true, index = 0;

    while(true) {
      let instruction = instructions[index];
      if (isValue(instruction)) {
        if (firstRun) {
          bots.getItem(instruction.bot).hold(instruction.value)
        }
      }
      else {
        let sourceBot = bots.getItem(instruction.bot);
        if (sourceBot.isFull()) {
          let vals = sourceBot.empty();
          let high = (instruction.high.bot ? bots : outputs).getItem(instruction.high.number);
          let low =   (instruction.low.bot ? bots : outputs).getItem(instruction.low.number);
          high.hold(vals.high);
          low.hold(vals.low);
          if (vals.high == 61 && vals.low == 17) {
            return sourceBot.number;
          }
        }
      }

      if (index === instructions.length - 1) {
        firstRun = false;
        if (bots.allEmpty()) {
          break;
        }
      }
      index = (index + 1) % instructions.length;
    }
  },

  // Challenge 2
  input => {
    let outputs = new OutputContainer();
    let bots = new BotContainer();

    let instructions = getInstructions(input);
    let firstRun = true, index = 0;

    while(true) {
      let instruction = instructions[index];
      if (isValue(instruction)) {
        if (firstRun) {
          bots.getItem(instruction.bot).hold(instruction.value)
        }
      }
      else {
        let sourceBot = bots.getItem(instruction.bot);
        if (sourceBot.isFull()) {
          let vals = sourceBot.empty();
          let high = (instruction.high.bot ? bots : outputs).getItem(instruction.high.number);
          let low =   (instruction.low.bot ? bots : outputs).getItem(instruction.low.number);
          high.hold(vals.high);
          low.hold(vals.low);
        }
      }

      if (index === instructions.length - 1) {
        firstRun = false;
        if (bots.allEmpty()) {
          break;
        }
      }
      index = (index + 1) % instructions.length;
    }

    return outputs.getItem(0).getChips()[0] *
           outputs.getItem(1).getChips()[0] *
           outputs.getItem(2).getChips()[0];
  }

];
