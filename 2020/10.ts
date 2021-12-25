import { getInput, groupByBlankLine } from './getInput.ts'

const numbers =(await getInput(10))
  .map(n => parseInt(n, 10))
  .sort((a, b) => a - b)

numbers.unshift(0)
numbers.push(numbers[numbers.length - 1] + 3)
const differences = numbers.map((n, i, l) => l[i + 1] - n)
differences.pop()

const grouped = differences.reduce((acc, n) => {
  if (acc[n]) {
    acc[n]++
  } else {
    acc[n] = 1
  }
  return acc
}, {} as Record<number, number>)

console.log(`Part 1: ${(grouped[1]) * (grouped[3])}`)

const tCache = new Map<number, number>()
tCache.set(0, 1)
tCache.set(1, 1)
tCache.set(2, 2)
const tribbonacci = (n: number): number => {
  const cached = tCache.get(n)
  if (typeof cached === 'number') {
    return cached
  }
  const next = tribbonacci(n - 1) + tribbonacci(n - 2) + tribbonacci(n - 3)
  tCache.set(n, next)
  return next
}

const possibilities = differences
  .join('').split('3').filter(a => a)
  .map(a => a.length)
  .map(a => tribbonacci(a))
  .reduce((a, b) => a * b)

console.log(`Part 2: ${possibilities}`)
