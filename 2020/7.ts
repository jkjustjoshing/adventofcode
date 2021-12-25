import { getInput, groupByBlankLine } from './getInput.ts'

const inputArr = (await getInput(7))

type Content = {
  num: number
  color: string,
  bag: Rule | null
}

type Rule<C = Content> = {
  bag: string
  contents: C[]
}

const createRules = () => {
  const rules: Rule[] = inputArr.map(input => {
    const [bag, contentsStr] = input.split(' bags contain ')
    const contents = contentsStr
      .replace('.', '')
      .split(', ')
      .filter(content => content !== 'no other bags')
      .map(content => {
        const [_, num, color] = content.match(/^(\d+) (.+) bags?$/) || []
        return { num: parseInt(num, 10), color, bag: null }
      })

    return { bag, contents }
  })

  const ruleMap = new Map<string, Rule>()
  rules.forEach(rule => ruleMap.set(rule.bag, rule as Rule))
  rules.forEach(rule => rule.contents.forEach(content => {
    content.bag = ruleMap.get(content.color)!
  }))

  return rules
}


const bagsThatContain = (colorToCheck: string) => {
  let anyEmpty = true
  let remainingRules = createRules()
  while (anyEmpty) {
    const emptyRules: string[] = []
    remainingRules = remainingRules.filter(r => {
      if (r.bag === colorToCheck) {
        return true
      }
      if (r.contents.length || r.contents.some(c => c.color === colorToCheck)) {
        return true
      }
      emptyRules.push(r.bag)
      return false
    })

    if (emptyRules.length) {
      remainingRules.forEach(rule => {
        rule.contents = rule.contents.filter(c => !emptyRules.includes(c.color))
      })
    } else {
      anyEmpty = false
    }
  }
  return remainingRules.length - 1
}

const containingBags = (colorToCheck: string): number => {
  const rules = createRules()
  const rule = rules.find(r => r.bag === colorToCheck)
  if (!rule) return 0
  if (!rule.contents?.length) return 1
  return rule.contents.map(c => c.num * containingBags(c.color)).reduce((a, b) => a + b) + 1
}

console.log(`Part 1: ${bagsThatContain('shiny gold')}`)
console.log(`Part 2: ${containingBags('shiny gold') - 1}`)
