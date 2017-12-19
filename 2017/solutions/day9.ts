'use strict';

import { Observable } from 'rxjs/Rx';

interface Item {

  parent: Group;

  parseInput(input: string): Item;
  getNestedScore (): number;

}

class Group implements Item {

  public children: Item[] = [];
  public parent: Group;
  public score: number;

  constructor (parent?: Group) {
    if (parent) {
      this.parent = parent;
      parent.children.push(this);
      this.score = parent.score + 1;
    }
    else {
      this.score = 0;
    }
  }

  parseInput (input: string): Item {
    if (input === '{') {
      // Create new sub-group
      return new Group(this);
    }
    if (input === '}') {
      return this.parent;
    }
    if (input === '<') {
      return new Garbage(this)
    }
    if (input === ',') {
      return this;
    }
    throw new Error('input ' + input + ' is not valid');
  }

  getNestedScore() {
    return this.score + this.children.map(a => a.getNestedScore()).reduce((a, b) => a + b, 0);
  }

}

var garbageCount = 0;
class Garbage implements Item {
  public parent: Group;

  constructor (parent: Group) {
    this.parent = parent;
    parent.children.push(this);
  }

  parseInput (input: string): Item {
    if (input === '>') {
      return this.parent;
    }
    garbageCount++;
    return this;
  }

  getNestedScore () {
    return 0;
  }
}

function part1 (input: string) {
    var cursor = new Group();
    return Observable.from(Array.from(input.trim()))
      .scan((previous, current) => {
        if (previous === '!') {
          return null;
        }
        return current;
      })
      .filter(a => a !== '!' && a !== null)
      .reduce((acc, next) => {
        return acc.parseInput(next);
      }, cursor)
      .map(item => cursor.getNestedScore())
}

export default [
  // Challenge 1
  (input: string) => {
    return part1(input).subscribe(a => console.log(a))
  },
  (input: string) => {
    part1(input).subscribe(a => console.log(garbageCount));
  }
];
