import { getInput } from './getInput.ts'

const treeRows = (await getInput(3)).map(n => {
  return function isTreeAt(x: number) {
    return n[x%n.length] === '#'
  }
})

const numberOfTreesAtSlope = (over: number, down: number) => treeRows.filter((isTreeAt, index) => index % down === 0 && isTreeAt(index * over)).length

const slopes: [number, number][] = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]

console.log(`Part 1: ${numberOfTreesAtSlope(3, 1)}`)
console.log(`Part 2: ${slopes.map(s => numberOfTreesAtSlope(...s)).reduce((a, b) => a * b, 1)}`)
