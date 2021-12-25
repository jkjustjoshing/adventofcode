import { getInput, groupByBlankLine } from './getInput.ts'

const initialNumbers = (await getInput(15))[0].split(',').map(a => parseInt(a, 10))



const getNextNumber = (numberMap: Map<number, number[]>, lastNumber: number) => {
  const lastNumberOccurrances = numberMap.get(lastNumber)
  if (!lastNumberOccurrances || lastNumberOccurrances.length === 1) {
    return 0
  }
  return lastNumberOccurrances[lastNumberOccurrances.length - 1] - lastNumberOccurrances[lastNumberOccurrances.length - 2]
}

const findNthNumber = (n: number) => {
  const numberMap = new Map<number, number[]>()
  initialNumbers.forEach((n, i) => {
    let arr = numberMap.get(n) || []
    arr.push(i)
    numberMap.set(n, arr)
  })
  let currentIndex = initialNumbers.length
  let lastNumber = initialNumbers[currentIndex - 1]

  while (currentIndex < n) {
    const nextNumber = getNextNumber(numberMap, lastNumber)
    const nextNumberList = numberMap.get(nextNumber) || []
    nextNumberList.push(currentIndex)
    numberMap.set(nextNumber, nextNumberList)
    lastNumber = nextNumber
    currentIndex++
  }
  return lastNumber
}
console.log(`Part 1: ${findNthNumber(2020)}`)
console.log(`Part 2: ${findNthNumber(30000000)}`)
