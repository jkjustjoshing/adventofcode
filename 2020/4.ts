import { getInput, groupByBlankLine } from './getInput.ts'

const inputArr = groupByBlankLine(await getInput(4)).map(s => s.join(' '))

const VALID_EYE_COLOR = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
type Passport = {
  byr: string
  iyr: string
  eyr: string
  hgt: string
  hcl: string
  ecl: string
  pid: string
  cid: string
}

let inputGroups: Partial<Passport>[] = inputArr.map(input => {
  const obj: Partial<Passport> = {}
  input.split(' ').forEach(s => {
    const [id, val] = s.split(':')
    obj[id as keyof Passport] = val
  })
  return obj
})

const part1Valid = inputGroups.filter(passport => {
  return ([
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
  ] as const).every(key => passport[key])
}).length

const part2Valid = inputGroups.filter(passport => {
  if (!passport.byr || !passport.byr.match(/^\d{4}$/)) {
    return false
  }
  const byr = parseInt(passport.byr, 10)
  if (byr < 1920 || byr > 2002) {
    return false
  }

  if (!passport.iyr || !passport.iyr.match(/^\d{4}$/)) {
    return false
  }
  const iyr = parseInt(passport.iyr, 10)
  if (iyr < 2010 || iyr > 2020) {
    return false
  }

  if (!passport.eyr || !passport.eyr.match(/^\d{4}$/)) {
    return false
  }
  const eyr = parseInt(passport.eyr, 10)
  if (eyr < 2020 || eyr > 2030) {
    return false
  }

  if (!passport.hgt) {
    return false
  }
  const [_, heightStr, units] = passport.hgt.match(/^(\d{2,3})(cm|in)$/) || []
  const height = parseInt(heightStr, 10)
  if (units === 'in') {
    if (height < 59 || height > 76) {
      return false
    }
  } else if (units === 'cm') {
    if (height < 150 || height > 193) {
      return false
    }
  } else {
    return false
  }

  if (!passport.hcl || !passport.hcl.match(/^#[0-9a-fA-F]{6}$/)) {
    return false
  }

  if (!passport.ecl || !VALID_EYE_COLOR.includes(passport.ecl)) {
    return false
  }

  if (!passport.pid || !passport.pid.match(/^\d{9}$/)) {
    return false
  }

  return true
}).length

console.log(`Part 1: ${part1Valid}`)
console.log(`Part 2: ${part2Valid}`)
