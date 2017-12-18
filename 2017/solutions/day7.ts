'use strict';

class Item {

  public childrenItems: Item[];
  public parent: Item;
  private totalWeight: number;

  constructor (public name: string, public weight: number, private children: string[]) {
    this.children = this.children || [];
  }

  mapChildren (dict) {
    this.childrenItems = this.children.map(a => {
      dict[a].parent = this;
      return dict[a];
    });
  }

  getTotalWeight (): number {
    if (typeof this.totalWeight !== 'number') {
      if (this.childrenItems.length) {
        this.totalWeight = this.childrenItems.map(a => a.getTotalWeight()).reduce((a, b) => a + b, 0) + this.weight;
      } else {
        this.totalWeight = this.weight;
      }
    }
    return this.totalWeight;
  }

  getChildrenWeight (): number[] {
    return this.childrenItems.map(a => a.getTotalWeight());
  }

  getItemWithDifferentWeight(): Item {
    var weights = {};
    this.childrenItems.forEach(item => {
      weights[item.getTotalWeight()] = weights[item.getTotalWeight()] || [];
      weights[item.getTotalWeight()].push(item);
    });
    for(var i in weights) {
      if (weights[i].length === 1) {
        return weights[i][0];
      }
    }
    return null;
  }

}

function getRoot (input: string): Item {
  var items = input.trim().split('\n').map(row => {
    let match = row.match(/^([a-z]+) \(([0-9]+)\)/);
    if (!match) throw new Error(row + ' could not be parsed');
    let children: string[];
    if (row.includes('->')) {
      children = row.split(' -> ')[1].trim().split(', ');
    }

    return new Item(match[1], parseInt(match[2], 10), children);
  });

  var itemDict = {};
  items.forEach(item => itemDict[item.name] = item);
  items.forEach(item => item.mapChildren(itemDict));

  var item = items[0];
  while(item.parent) {
    item = item.parent;
  }
  return item;
}

module.exports = [
  // Challenge 1
  (input: string) => {
    return getRoot(input).name;
  }, (input: string) => {
    var root = getRoot(input);
    root.getTotalWeight();

    var misweighted = root;
    while(true) {
      var next = misweighted.getItemWithDifferentWeight();
      if (next) {
        misweighted = next;
      } else {
        break;
      }
    }
    var parent = misweighted.parent;
    var sibling = parent.childrenItems[0];
    if (sibling === misweighted) {
      sibling = parent.childrenItems[1];
    }
    var diff = misweighted.getTotalWeight() - sibling.getTotalWeight();
    return misweighted.weight - diff;
  }
];
