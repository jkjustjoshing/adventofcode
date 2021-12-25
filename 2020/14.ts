import { getInput, groupByBlankLine } from './getInput.ts'

const instructions = (await getInput(14)).map(i => {
  const match = i.match(/^mask = ((?:X|1|0)+)$/)
  if (match) {
    return { isMask: true as true, mask: match[1] }
  }
  const match2 = i.match(/^mem\[(\d+)\] = (\d+)$/)
  if (match2) {
    return { isMask: false as false, location: parseInt(match2[1], 10), value: parseInt(match2[2], 10) }
  }
  throw new Error('Input error - ' + i)
})

const mask = (mask: string, value: number): number => {
  let valueDigits = value.toString(2).split('').reverse()
  let maskDigits = mask.split('').reverse()

  for (let i = 0; i < maskDigits.length; ++i) {
    if (maskDigits[i] === '1') {
      valueDigits[i] = '1'
    } else if (maskDigits[i] === '0') {
      valueDigits[i] = '0'
    } else {
      valueDigits[i] = valueDigits[i] || '0'
    }
  }

  return parseInt(valueDigits.reverse().join(''), 2)
}

const memory1 = new Map<number, number>()
let currentMask1 = ''
for(const instruction of instructions) {
  if (instruction.isMask) {
    currentMask1 = instruction.mask
  } else {
    let maskedValue = mask(currentMask1, instruction.value)
    memory1.set(instruction.location, maskedValue)
  }
}

let sum = 0;
for(var num of memory1.values()) {
  sum += num
}
console.log(`Part 1: ${sum}`)

// Part 2

const mask2 = (mask: string, address: number): number[] => {
  let addressDigits = address.toString(2).split('').reverse()
  let maskDigits = mask.split('').reverse()

  for (let i = 0; i < maskDigits.length; ++i) {
    if (maskDigits[i] === '1') {
      addressDigits[i] = '1'
    } else if (maskDigits[i] === '0') {
      addressDigits[i] = addressDigits[i] || '0'
    } else { // X
      addressDigits[i] = 'X'
    }
  }
  const variants = 2**addressDigits.filter(d => d === 'X').length
  const xIndexes = addressDigits.map((d, i) => d === 'X' ? i : -1).filter(i => i !== -1)
  const addresses: string[][] = (new Array(variants)).fill(null).map(() => [...addressDigits])
  for (let xIndex = 0; xIndex < xIndexes.length; ++xIndex) {
    for(let aIndex = 0; aIndex < addresses.length; ++aIndex) {
      const address = addresses[aIndex]
      address[xIndexes[xIndex]] = ((aIndex >> xIndex) % 2) ? '0' : '1'
    }
  }

  return addresses.map(aDigits => parseInt(aDigits.reverse().join(''), 2))
}

const memory2 = new Map<number, number>()
let currentMask2 = ''
for(const instruction of instructions) {
  if (instruction.isMask) {
    currentMask2 = instruction.mask
  } else {
    let maskedAddresses = mask2(currentMask2, instruction.location)
    maskedAddresses.forEach(address => {
      memory2.set(address, instruction.value)
    })
  }
}

let sum2= 0;
for(var num of memory2.values()) {
  sum2 += num
}
console.log(`Part 2: ${sum2}`)
