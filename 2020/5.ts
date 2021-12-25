import { getInput } from './getInput.ts'

const toNumber = (str: string) => parseInt(str.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2)

const inputArr = (await getInput(5)).map(input => {
  return {
    y: toNumber(input.substr(0, 7)),
    x: toNumber(input.substr(7))
  }
})

const seatIds = inputArr.map(({ x, y }) => y * 8 + x).sort((a, b) => a - b)

const highestId = seatIds[seatIds.length - 1]
const mySeatId = (seatIds.find((id, index, arr) => index !== 0 && index !== arr.length - 1 && id + 1 !== arr[index + 1]) || 0) + 1

console.log(`Part 1: ${highestId}`)
console.log(`Part 2: ${mySeatId}`)
