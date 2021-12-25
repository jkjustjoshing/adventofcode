import { getInput, groupByBlankLine } from './getInput.ts'

const numbers = (await getInput(9)).map(n => parseInt(n, 10))

const canBeSummed = (number: number, options: number[]) => {
  for(let i = 0; i < options.length; ++i) {
    for(let j = i; j < options.length; ++j) {
      if (options[i] + options[j] === number) {
        return [options[i], options[j]]
      }
    }
  }
}

const findConsecutiveThatSum = (list: number[], number: number) => {
  for (let i = 0; i < list.length; ++i) {
    let sum = 0
    let index = 0
    while (sum < number) {
      sum += list[i + index]
      if (sum === number) {
        return list.slice(i, i + index + 1)
      }
      index++
    }
  }
}

const firstInvalid = (list: number[], lookback: number) => {
  for (let i = lookback; i < list.length; ++i) {
    const lookbackList = list.slice(i - lookback, i)
    if (!canBeSummed(list[i], lookbackList)) {
      return list[i]
    }
  }
  return null
}

const min = (nums: number[]) => nums.reduce((a, b) => a < b ? a : b, Infinity)
const max = (nums: number[]) => nums.reduce((a, b) => a < b ? b : a, -Infinity)

const part1 = firstInvalid(numbers, 25)
console.log(`Part 1: ${part1}`)

const part2 = findConsecutiveThatSum(numbers, part1!)!
console.log(`Part 2: ${min(part2) + max(part2)}`)
