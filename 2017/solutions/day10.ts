'use strict';

function sliceWrap<T>(list: T[], index: number, length: number): T[] {
  let doubleList = [ ...list, ...list ];
  return doubleList.slice(index, index + length);
}

function spliceWrap<T>(list: T[], index: number, items: T[]): T[] {
  var listToReturn = [ ...list ];
  for (let i = 0; i < items.length; ++i) {
    listToReturn[(index + i) % list.length] = items[i];
  }
  return listToReturn;
}

function runHash (list: number[], input: number[], cursor: number, skipSize: number) {
  input.forEach(command => {
    let reversedList = sliceWrap(list, cursor, command).reverse();
    list = spliceWrap(list, cursor, reversedList);
    cursor = (cursor + skipSize + command) % list.length;
    skipSize++;
  });
  return { list, cursor, skipSize };
}

export default [
  // Challenge 1
  (input: string) => {
    var list: number[] = Array.from(Array(256).keys());
    var cursor = 0;
    var skipSize = 0;
    let inputNumbers = input.trim().split(',').map(a => parseInt(a, 10));
    var result = runHash(list, inputNumbers, cursor, skipSize);
    list = result.list;
    cursor = result.cursor;
    skipSize = result.skipSize;
    return list[0] * list[1];
  },
  (input: string) => {
    var list: number[] = Array.from(Array(256).keys());
    var cursor = 0;
    var skipSize = 0;
    let inputChars = input.trim().split('').map(a => a.charCodeAt(0));
    inputChars.push(17, 31, 73, 47, 23);

    for(let i = 0; i < 64; ++i) {
      var result = runHash(list, inputChars, cursor, skipSize);
      list = result.list;
      cursor = result.cursor;
      skipSize = result.skipSize;
    }

    let sparseHash = list;

    let denseHash = [];
    for (let i = 0; i < sparseHash.length; i+= 16) {
      denseHash.push(sparseHash.slice(i, i + 16).reduce((a, b) => a ^ b));
    }

    return denseHash.map(a => Number(a).toString(16).padStart(2, '0')).join('');
  }
];
