import { getInput, groupByBlankLine } from './getInput.ts'

type Direction = 'N' | 'S' | 'E' | 'W' | 'L' | 'R' | 'F'

const directions =(await getInput(12))
  .map(n => {
    const [_, dir, num] = n.match(/^([A-Z])(\d+)$/) || []
    return {
      dir: dir as Direction,
      num: parseInt(num, 10)
    }
  })

const followInstructions1 = () => {
  let coordinates: [number, number] = [0, 0]
  let direction = 0

  directions.forEach(({ dir, num }) => {
    let currentDir = dir
    if (currentDir === 'F') {
      currentDir = direction === 0 ? 'E' : direction === 90 ? 'N' : direction === 180 ? 'W' : 'S'
    }

    switch (currentDir) {
      case 'N':
        coordinates[0] += num
        break
      case 'S':
        coordinates[0] -= num
        break
      case 'E':
        coordinates[1] += num
        break
      case 'W':
        coordinates[1] -= num
        break
      case 'L':
        direction = ((direction + num) % 360)
        break
      case 'R':
        direction = ((direction - num + 360) % 360)
        break
    }
  })

  return { coordinates, direction }
}


const followInstructions2 = () => {
  let coordinates: [number, number] = [0, 0]
  let waypoint: [number, number] = [10, 1]

  directions.forEach(({ dir, num }) => {
    switch (dir) {
      case 'N':
        waypoint[1] += num
        break
      case 'S':
        waypoint[1] -= num
        break
      case 'E':
        waypoint[0] += num
        break
      case 'W':
        waypoint[0] -= num
        break
      case 'R':
      case 'L':
        let degrees = ((dir === 'R' ? -num : num) + 360) % 360
        if (degrees === 90) {
          waypoint = [-waypoint[1], waypoint[0]]
        } else if (degrees === 180) {
          waypoint = [-waypoint[0], -waypoint[1]]
        } else if (degrees === 270) {
          waypoint = [waypoint[1], -waypoint[0]]
        }
        break
      case 'F':
        coordinates = [coordinates[0] + (waypoint[0] * num), coordinates[1] + (waypoint[1] * num)]
    }
  })

  return { coordinates }
}

const coordinates1 = followInstructions1().coordinates
console.log(`Part 1: ${Math.abs(coordinates1[0]) + Math.abs(coordinates1[1])}`)
const coordinates2 = followInstructions2().coordinates
console.log(`Part 2: ${Math.abs(coordinates2[0]) + Math.abs(coordinates2[1])}`)
