'use strict';

// Input format "R3, L37, L5"
function getLocationHistory (input) {
  let items = input.split(', ').map(item => ({
    direction: item[0],
    distance: parseInt(item.substr(1), 10)
  }));

  let position = [0, 0];
  let direction = [0, 1];
  let positionHistory = [ [...position] ];

  items.map(item => {
    direction[0] = (direction[0] + 1) % 2;
    if (item.direction === 'L' && direction[0]) {
      direction[1] = direction[1] * -1;
    }
    else if (item.direction === 'R' && !direction[0]) {
      direction[1] = direction[1] * -1;
    }
    for (let i = 0; i < item.distance; ++i) {
      position[direction[0]] += direction[1];
      positionHistory.push([...position]);
    }
  });

  return positionHistory;
}

module.exports = [
  // Challenge 1
  input => {
    let locations = getLocationHistory(input);
    let location = locations[locations.length - 1];
    return Math.abs(location[0]) + Math.abs(location[1]);
  },
  input => {
    let locations = getLocationHistory(input);

    let items = {};
    for(let i = 0; i < locations.length; ++i) {
      let key = locations[i][0] + ', ' + locations[i][1];
      if (items[key]) {
        return Math.abs(locations[i][0]) + Math.abs(locations[i][1]);
      }
      items[key] = true;
    }
  }

];
