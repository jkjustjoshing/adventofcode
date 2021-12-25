import { getInput, groupByBlankLine } from './getInput.ts'

type Seat = ('.' | 'L' | '#')

const map =(await getInput(11))
  .map(n => n.split('')) as Seat[][]

type Find = (map: Seat[][], coordinates: [number, number], direction: [number, number]) => Seat

const getNextMapState = (map: Seat[][], threshold: number, find: Find): Seat[][] => map.map((row, i, map) => row.map((seat, j) => {
  let surrounding = [] as Seat[]
  for(let k = -1; k < 2; ++k) {
    for(let m = -1; m < 2; ++m) {
      if (k || m) {
        surrounding.push(find(map, [i,j], [k, m]))
      }
    }
  }

  let occupied = surrounding.filter(s => s === '#').length
  if (seat === 'L' && occupied === 0) {
    return '#'
  } else if (seat === '#' && occupied >= threshold) {
    return 'L'
  } else {
    return seat
  }
}))

const find1: Find = (map, coordinates, direction) => {
  const nextCoordinates = [coordinates[0] + direction[0], coordinates[1] + direction[1]]
  const nextItem = map[nextCoordinates[0]]?.[nextCoordinates[1]]
  return nextItem || '.'
}

const find2: Find = (map, coordinates, direction) => {
  let currentCoordinates = coordinates
  while(true) {
    currentCoordinates = [currentCoordinates[0] + direction[0], currentCoordinates[1] + direction[1]]
    const currentItem = map[currentCoordinates[0]]?.[currentCoordinates[1]]
    if (currentItem === '.') {
      continue
    } else if (!currentItem) {
      return '.'
    }
    return currentItem
  }
}

const areStatesEqual = (map1: Seat[][], map2: Seat[][]) => {
  for(let i = 0; i < map1.length; ++i) {
    for(let j = 0; j < map1[0].length; ++j) {
      if (map1[i][j] !== map2[i][j]) {
        return false
      }
    }
  }
  return true
}

const printMap = (map: Seat[][]) => map.map(r => r.join('')).join('\n')
const getOccupiedSeats = (threshold: number, find: Find) => {
  let stableState = map
  while (true) {
    const nextState = getNextMapState(stableState, threshold, find)
    if (areStatesEqual(nextState, stableState)) {
      break
    }
    stableState = nextState
  }
  return stableState.flatMap(r => r.filter(s => s === '#')).length
}
console.log(`Part 1: ${getOccupiedSeats(4, find1)}`)
console.log(`Part 2: ${getOccupiedSeats(5, find2)}`)
