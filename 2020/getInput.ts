import { config } from 'https://deno.land/x/dotenv/mod.ts'
const env = config()

export const getInput = async (day: number, hardcode?: string) => {
  if (hardcode) {
    return hardcode.split('\n')
  }

  const headers = new Headers()
  headers.set('Cookie', env.COOKIE)
  const input = await fetch({
    method: 'GET',
    url: `https://adventofcode.com/2020/day/${day}/input`,
    headers
  } as Request).then(r => r.text())

  return input.trim().split('\n')
}

export const groupByBlankLine = (inputArr: string[]) => {
  let response: string[][] = [[]]
  for (let i = 0; i < inputArr.length; ++i) {
    const input = inputArr[i]
    if (input === '') {
      response.push([])
      continue
    }
    response[response.length - 1].push(inputArr[i])
  }
  return response
}
