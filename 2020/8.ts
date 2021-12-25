import { getInput, groupByBlankLine } from './getInput.ts'

const instructions = (await getInput(8)).map(instruction => {
  const [instr, value] = instruction.split(' ')
  return {
    instruction: instr as 'nop' | 'acc' | 'jmp',
    value: parseInt(value, 10)
  }
})
type Instructions = typeof instructions

const part1 = () => {
  let register = 0
  let pointer = 0
  let executionCount = instructions.map(i => ({ ...i, count: 0 }))

  while (true) {
    let previousPointer = pointer
    const instruction = executionCount[pointer]
    if (instruction.count !== 0) {
      break
    }
    switch (instruction.instruction) {
      case 'acc':
        register += instruction.value
        pointer = pointer + 1
        break
      case 'nop':
        pointer = pointer + 1
        break
      case 'jmp':
       pointer = pointer + instruction.value
       break
    }

    executionCount[previousPointer] = { ...instruction, count: 1 }
  }

  return register
}

const execute = (instructions: Instructions) => {
  let register = 0
  let pointer = 0
  let executionCount = instructions.map(i => ({ ...i, count: 0 }))

  while (true) {
    let previousPointer = pointer
    const instruction = executionCount[pointer]
    if (!instruction) {
      break
    }
    if (instruction.count !== 0) {
      throw new Error('loops')
    }
    switch (instruction.instruction) {
      case 'acc':
        register += instruction.value
        pointer = pointer + 1
        break
      case 'nop':
        pointer = pointer + 1
        break
      case 'jmp':
       pointer = pointer + instruction.value
       break
    }

    executionCount[previousPointer] = { ...instruction, count: 1 }
  }

  return register
}

const part2 = () => {
  for (let i = 0; i < instructions.length; ++i) {
    if (instructions[i].instruction === 'acc') {
      continue
    }
    const duplicate = [...instructions]
    duplicate[i] = { ...duplicate[i], instruction: duplicate[i].instruction === 'jmp' ? 'nop' : 'jmp' }
    let result
    try {
      result = execute(duplicate)
    } catch {
      continue
    }
    return result
  }
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
