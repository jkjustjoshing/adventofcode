import { getInput, groupByBlankLine } from './getInput.ts'

const input = (await getInput(16)).join('\n')
const [rulesStrings, yourTicketStr, nearbyStrs] = input.split('\n\n').map(t => t.split('\n'))


const nearby = nearbyStrs.filter((f, i) => i !== 0).map(f => f.split(',').map(i => parseInt(i, 10)))
const yourTicket = yourTicketStr[1].split(',').map(i => parseInt(i, 10))
const rules = rulesStrings.map(row => {
  const [text, numbers] = row.split(': ')
  const [range1, range2] = numbers.split(' or ').map(n => n.split('-').map(i => parseInt(i, 10)))
  return {
    text,
    ranges: [
      { min: range1[0], max: range1[1] },
      { min: range2[0], max: range2[1] }
    ]
  }
})

type Rule = typeof rules[0]

const isNumberValid = (number: number, rule: Rule) => {
  for(let j = 0; j < rule.ranges.length; ++j) {
    const range = rule.ranges[j]
    if (range.min <= number && range.max >= number) {
      return true
    }
  }
  return false
}

const nearbyHasError = nearby
  .map(n => {
    const invalidNumber = n.find(n => rules.every(r => !isNumberValid(n, r)))
    return {
      n,
      invalidNumber
    }
  })
const errors = nearbyHasError.filter(n => typeof n.invalidNumber === 'number').map(n => n.invalidNumber) as number[]
const errorSum = errors.reduce((a, b) => a + b)
console.log(`Part 1: ${errorSum}`)

const validTickets = nearbyHasError.filter(n => typeof n.invalidNumber !== 'number').map(n => n.n)
let rulesWithValidIndexes = rules.map(r => ({ ...r, validIndexes: (new Array(validTickets[0].length)).fill(null).map((_, i) => i) }))
rulesWithValidIndexes.forEach(rule => {
  rule.validIndexes = rule.validIndexes.filter(index => {
    for (let i = 0; i < validTickets.length; ++i) {
      if (!isNumberValid(validTickets[i][index], rule)) {
        return false
      }
    }
    return true
  })
})

const finalRules = [] as (Rule & { validIndexes: number[] })[]
while(rulesWithValidIndexes.length) {
  const oneValidIndex = rulesWithValidIndexes.findIndex(r => r.validIndexes.length === 1)
  if (oneValidIndex === -1) {
    throw new Error(`No solution`)
  }
  const oneValid = rulesWithValidIndexes[oneValidIndex]
  finalRules.push(oneValid)
  rulesWithValidIndexes = rulesWithValidIndexes.filter((_, i) => i !== oneValidIndex)
  rulesWithValidIndexes.forEach(r => {
    r.validIndexes = r.validIndexes.filter(n => n !== oneValid.validIndexes[0])
  })
}

const departureRuleIndexes = finalRules.filter(r => r.text.includes('departure')).map(r => r.validIndexes[0])
const myTicketDeparatureFieldProduct = departureRuleIndexes.map(i => yourTicket[i]).reduce((a, b) => a * b)

console.log(`Part 2: ${myTicketDeparatureFieldProduct}`)
