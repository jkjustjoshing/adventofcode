import { getInput } from './getInput.ts'

const inputNumbers = (await getInput(1)).map(n => parseInt(n, 10))

const addTo2020Product = (inputNumbers: number[]) => {
  for(let index = 0; index < inputNumbers.length; ++index) {
    for(let i = index + 1; i < inputNumbers.length; ++i) {
      if (inputNumbers[index] + inputNumbers[i] === 2020) {
        return inputNumbers[index] * inputNumbers[i]
      }
    }
  }
}

const addThree2020Product = (inputNumbers: number[]) => {
  for(let index = 0; index < inputNumbers.length; ++index) {
    for(let i = index + 1; i < inputNumbers.length; ++i) {
      for(let j = i + 1; j < inputNumbers.length; ++j) {
        if (inputNumbers[index] + inputNumbers[i] + inputNumbers[j] === 2020) {
          return inputNumbers[index] * inputNumbers[i] * inputNumbers[j]
        }
      }
    }
  }
}

console.log(`Part 1: ${addTo2020Product(inputNumbers)}`)
console.log(`Part 2: ${addThree2020Product(inputNumbers)}`)
