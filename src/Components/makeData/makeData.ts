import namor from 'namor'

const range = (len: number)  => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export type IPerson = {
  firstName: string;
  lastName: string;
  course: number;
  grade: number;
}

const newPerson = (): IPerson => {
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    course: Math.floor(Math.random() * 6),
    grade: Math.floor(Math.random() * 100),
  }
}

export default function makeData(...lens: number[]) {
  const makeDataLevel: any = (depth: number = 0) => {
    const len: number = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }
console.dir(makeDataLevel)
  return makeDataLevel()
}
