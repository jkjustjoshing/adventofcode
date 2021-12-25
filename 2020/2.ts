import { getInput } from './getInput.ts'

const inputPasswords = (await getInput(2)).map(n => {
  const [_, lowNumber, highNumber, character, password] = n.match(/^(\d+)-(\d+) (.): (.+)$/) || []
  return {
    lowNumber: parseInt(lowNumber, 10),
    highNumber: parseInt(highNumber, 10),
    character,
    password,
    characterOccurance: password.split('').filter(c => c === character).length
  }
})

const numberOfValidPasswordsPart1 = inputPasswords
  .filter(({ lowNumber, highNumber, characterOccurance }) => characterOccurance <= highNumber && characterOccurance >= lowNumber)
  .length

const numberOfValidPasswordsPart2 = inputPasswords
  .filter(({ lowNumber, highNumber, character, password }) => {
    const count = ((password[lowNumber - 1] === character) ? 1 : 0) + ((password[highNumber - 1] === character) ? 1 : 0)
    return count === 1
  })
  .length


console.log(`Part 1: ${numberOfValidPasswordsPart1}`)
console.log(`Part 2: ${numberOfValidPasswordsPart2}`)
