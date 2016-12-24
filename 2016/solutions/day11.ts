'use strict';

import * as _ from 'lodash';

class Generator {
  public type: 'generator' = 'generator';
  constructor (public name: string) {}

  print () {
    return _.padEnd(this.name.toUpperCase(), 3)
  }

  clone () {
    return new Generator(this.name);
  }
}

class Microchip {
  public type: 'microchip' = 'microchip';
  constructor (public name: string) {}

  print () {
    return _.padEnd(this.name.toLowerCase(), 3)
  }

  clone () {
    return new Microchip(this.name);
  }
}

class Floor {
  public generators: Generator[] = [];
  public microchips: Microchip[] = [];
  public elevator: Elevator = null;

  constructor (public number: number) {}

  print () {
    let toPrint = `| ${_.padEnd('Floor ' + this.number, 8)} ${this.elevator ? 'E' : ' '} | `;

    let gens = this.generators.map(item => item.print()).join(' | ');
    let micros = this.microchips.map(item => item.print()).join(' | ');
    toPrint += gens + (gens && micros ? ' | ' : '') + micros + ' | ';

    if (this.elevator) {
      this.elevator.slots.map(item => {
        if (!item) {
          return;
        }
        toPrint += ' | ' + item.print();
      });
    }

    console.log(toPrint);
  }

  add (...items: (Generator | Microchip)[]) {
    items.map(item => {
      if (item instanceof Generator) {
        this.generators.push(item);
      }
      else {
        this.microchips.push(item);
      }
    });
  }

  clone () {
    let floor = new Floor(this.number);
    floor.generators = this.generators.map(gen => gen.clone());
    floor.microchips = this.microchips.map(gen => gen.clone());
    floor.elevator = this.elevator ? this.elevator.clone(floor) : null;

    return floor;
  }

  isEquivalent (floor: Floor) {
    if (this.generators.length !== floor.generators.length) {
      return false;
    }
    for (let i = 0; i < this.generators.length; i++) {
      if (this.generators[i].name !== floor.generators[i].name) {
        return false;
      }
    }
    if (this.microchips.length !== floor.microchips.length) {
      return false;
    }
    for (let i = 0; i < this.microchips.length; i++) {
      if (this.microchips[i].name !== floor.microchips[i].name) {
        return false;
      }
    }

    if (!this.elevator && floor.elevator) {
      return false;
    }
    if (this.elevator && !this.elevator.isEquivalent(floor.elevator)) {
      return false;
    }

    return true;
  }

}

class Building {
  public floors: Floor[] = [];

  constructor (height: number | Building) {
    if (typeof height === 'number') {
      for (let i = 1; i <= height; i++) {
        this.floors.push(new Floor(i));
      }
    }
    else {
      this.floors = height.floors.map(floor => floor.clone());
    }
  }

  getFloor (number: number) {
    return this.floors[number];
  }

  print () {
    for (let i = this.floors.length - 1; i >= 0; --i) {
      this.floors[i].print();
    }
  }

  clone () {
    return new Building(this);
  }

  isEquivalent (bldg: Building) {

    let a = [], b = [];

    for(let i = 0; i < this.floors.length; i++) {
      if (!this.floors[i].isEquivalent(bldg.floors[i])) {
        return false;
      }
    }
    return true;
  }
}

class Elevator {
  public slots: [ Generator | Microchip, Generator | Microchip ] = [ null, null ];
  private floor: Floor;

  constructor (floor: Floor) {
    this.move(floor);
  }

  move (floor: Floor) {
    if (this.floor) {
      this.floor.elevator = null;
    }
    this.floor = floor;
    this.floor.elevator = this;
  }

  clone (floor) {
    let elevator = new Elevator(floor);
    elevator.slots = this.slots.map(slot => slot && slot.clone());
    return elevator;
  }

  isEquivalent (elevator: Elevator) {
    if (!elevator) {
      return false;
    }
    if (this.floor.number !== elevator.floor.number) {
      return false;
    }

    function isEquivalent (a, b) {
      if (!a && !b) {
        return true;
      }
      if ((a && !b) || (!a && b)) {
        return false;
      }
      return a.name === b.name && a.type === b.type;
    }

    if ((isEquivalent(elevator.slots[0], this.slots[0]) && isEquivalent(elevator.slots[1], this.slots[1])) ||
        (isEquivalent(elevator.slots[1], this.slots[0]) && isEquivalent(elevator.slots[0], this.slots[1]))) {
      return true;
    }
    return false;

  }
}

function createPair (name: string) {
  return {
    microchip: new Microchip(name),
    generator: new Generator(name)
  };
}

module.exports = [
  // Challenge 1
  (input) => {
    let building = new Building(4);
    let elevator = new Elevator(building.getFloor(0));

    let a = createPair('a');
    let b = createPair('b');
    let c = createPair('c');
    let d = createPair('d');
    let e = createPair('e');

    let first = building.getFloor(0);
    first.add(a.generator, b.generator, b.microchip, c.generator, d.generator, d.microchip, e.generator, e.microchip);
    let second = building.getFloor(1);
    second.add(a.microchip, c.microchip);

    building.print();

    let building2 = building.clone();
    console.log(building2.isEquivalent(building));
  },

  // Challenge 2
  input => {

  }

];
