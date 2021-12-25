import { getInput, groupByBlankLine } from './getInput.ts'

const inputArr = groupByBlankLine((await getInput(6)))

const someAnswerCounts = inputArr.map(answers => {
  const set = new Set(answers.join('').split(''))
  return set.size
})

const allAnswerCounts = inputArr.map(answers => {
  const answerCounts: Record<string, number> = {}
  answers.join('').split('').forEach(l => {
    answerCounts[l] = (answerCounts[l] || 0) + 1
  })
  return Object.values(answerCounts).filter(v => v === answers.length).length
})

console.log(`Part 1: ${someAnswerCounts.reduce((a, b) => a + b, 0)}`)
console.log(`Part 2: ${allAnswerCounts.reduce((a, b) => a + b, 0)}`)
