'use strict';

class HexNode {
  public x = 0;
  public y = 0;
  public z = 0;

  constructor (hex?: HexNode) {
    if (hex) {
      this.x = hex.x;
      this.y = hex.y;
      this.z = hex.z;
    }
  }

  maxDistance () {
    return [ this.x, this.y, this.z ].map(a => Math.abs(a)).reduce((a, b) => a < b ? b : a);
  }
}

function getNodePath (instructions: string[]) {
  return instructions.reduce((allNodes, direction) => {
    var next = new HexNode(allNodes[allNodes.length - 1]);
    switch (direction) {
      case 'n':
        // Move up in X
        next.y++;
        next.z--;
        break;
      case 's':
        // Move down in Z
        next.y--;
        next.z++;
        break;
      case 'se':
        // Move up in Z
        next.x++;
        next.y--;
        break;
      case 'nw':
        // Move down in Z
        next.x--;
        next.y++;
        break;
      case 'ne':
        // Move up in Y
        next.x++;
        next.z--;
        break;
      case 'sw':
        // Move down in Y
        next.x--;
        next.z++;
        break;
      default:
        throw new Error('could not find ' + direction);
    }
    return [ ...allNodes, next ];
  }, [new HexNode()]);
}

export default [
  // Challenge 1
  (input: string) => {
    return getNodePath(input.trim().split(',')).reverse()[0].maxDistance();
  },
  (input: string) => {
    return getNodePath(input.trim().split(',')).map(a => a.maxDistance()).reduce((a, b) => a < b ? b : a);
  }
];
