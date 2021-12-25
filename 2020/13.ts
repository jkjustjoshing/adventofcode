import { getInput, groupByBlankLine } from './getInput.ts'

const [delayStr, bussesStr] = (await getInput(13))
const delay = parseInt(delayStr, 10)
const busses = bussesStr.split(',')

const part1Busses = busses.filter(b => b.toLowerCase() !== 'x').map(b => parseInt(b, 10))
const part1Remainders = part1Busses.map(b => b - (delay % b))
const minIndex = part1Remainders.reduce((minIndex, next, index, arr) => next < arr[minIndex] ? index : minIndex, 0)

console.log(`Part 1: ${part1Remainders[minIndex] * part1Busses[minIndex]}`)

const part2 = busses
  .map((b, i) => {
    if (b.toLowerCase() === 'x') {
      return { interval: -1, offset: i }
    }
    return { interval: parseInt(b, 10), offset: i }
  })
  .filter(b => b.interval !== -1)

let currentInterval = 1
let currentTimestamp = 0
for(let i = 0; i < part2.length; ++i) {
  const { interval, offset } = part2[i]

  if (i !== 0) {
    currentInterval *= part2[i - 1].interval
  }
  while (true) {
    if ((currentTimestamp + offset) % interval === 0) {
      break
    }
    currentTimestamp += currentInterval
  }
}
console.log(`Part 2: ${currentTimestamp}`)
