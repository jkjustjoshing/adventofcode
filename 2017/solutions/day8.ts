'use strict';

const registers: { [name: string]: Register } = {};

const ops = {
  inc: (val: number, amount: number) => val + amount,
  dec: (val: number, amount: number) => val - amount
}

const compares = {
  '<': (lhs: number, rhs: number) => lhs < rhs,
  '>': (lhs: number, rhs: number) => lhs > rhs,
  '>=': (lhs: number, rhs: number) => lhs >= rhs,
  '<=': (lhs: number, rhs: number) => lhs <= rhs,
  '!=': (lhs: number, rhs: number) => lhs != rhs,
  '==': (lhs: number, rhs: number) => lhs == rhs
}

class Register {
  private history: number[] = [];

  constructor (public name: string, value: number = 0) {
    this.history.push(value);
    registers[this.name] = this;
  }

  setValue (val) {
    this.history.push(val);
  }

  getValue () {
    return this.history[this.history.length - 1];
  }

  getLargestValue() {
    return this.history.reduce((a, b) => a < b ? b : a);
  }

  static get (name): Register {
    return registers[name] || new Register(name);
  }
}

class Test {

  private register: Register;
  private operation: (lhs: number, rhs: number) => boolean;
  private amount: number;

  constructor (str: string) {
    let match = str.match(/^([a-z]+) ([=<>!]{1,2}) (-?\d+)$/);
    this.register = Register.get(match[1]);
    this.operation = compares[match[2]];
    this.amount = parseInt(match[3], 10);
  }

  test () {
    return this.operation(this.register.getValue(), this.amount);
  }
}

class Instruction {

  private register: Register;
  private op: (val: number, amount: number) => number;
  private amount: number;
  private test: Test;

  constructor (row: string) {

    // eri dec -617 if uy == 24
    let matches = row.match(/^([a-z]+) (dec|inc) (-?\d+) if (.*)$/)
    this.register = Register.get(matches[1]);
    this.op = ops[matches[2]]
    this.amount = parseInt(matches[3], 10);
    this.test = new Test(matches[4]);
  }

  execute () {
    if (this.test.test()) {
      this.register.setValue(this.op(this.register.getValue(), this.amount));
    }
  }
}

module.exports = [
  // Challenge 1
  (input: string) => {
    input.trim().split('\n').forEach(row => {
      var instruction = new Instruction(row);
      instruction.execute();
    });

    return Object.keys(registers).map(key => registers[key]).reduce((current, next) => {
      return current.getValue() < next.getValue() ? next : current;
    }).getValue();
  },
  (input: string) => {
    input.trim().split('\n').forEach(row => {
      var instruction = new Instruction(row);
      instruction.execute();
    });

    return Object.keys(registers).map(key => registers[key]).reduce((current, next) => {
      return current.getLargestValue() < next.getLargestValue() ? next : current;
    }).getLargestValue();
  }
];
