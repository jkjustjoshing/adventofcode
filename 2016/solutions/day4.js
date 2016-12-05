'use strict';

function getRows (input) {
  return input.trim().split('\n').map(row => {
    let match = row.match(/^([a-z\-]+)\-([0-9]+)\[([a-z]{5})\]$/);
    let roomCode = match[1].replace(/\-/g, ' ');
    let sectorNum = parseInt(match[2]);
    let checksum = match[3];
    let mostCommonLetters = Array.from(roomCode).reduce((groups, nextLetter) => {
      if (!isNaN(parseInt(nextLetter)) || nextLetter === ' ') {
        return groups;
      }

      let existingGroup = groups.find(group => group.letter === nextLetter);
      if (existingGroup) {
        existingGroup.count++;
      }
      else {
        groups.push({ letter: nextLetter, count: 1 });
      }
      return groups;
    }, []).sort((group1, group2) => {
      if (group1.count !== group2.count) return group2.count - group1.count;
      return group1.letter.charCodeAt(0) - group2.letter.charCodeAt(0);
    });
    return { roomCode, checksum, mostCommonLetters, sectorNum };
  });
}

function matchesScrambled (str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  let arr1 = Array.from(str1);
  let arr2 = Array.from(str2);

  for(let i = 0; i < arr1.length; ++i) {
    if (arr2.indexOf(arr1[i]) === -1) {
      return false;
    }
    else {
      arr2.splice(arr2.indexOf(arr1[i]), 1);
    }
  }
  return arr2.length === 0;
}

function getValidRows (input) {
  return getRows(input).map(row => {
    let commonLetters = '';
    for(let i = 0; i < 5; ++i) {
      commonLetters += row.mostCommonLetters[i].letter;
    }
    if (matchesScrambled(row.checksum, commonLetters)) {
      return row;
    }
    return false;
  }).filter(row => row);
}

module.exports = [
  // Challenge 1
  input => {
    return getValidRows(input).reduce((a, b) => a + b.sectorNum, 0);
  },

  // Challenge 2
  input => {
    const charCodeA = 'a'.charCodeAt(0);
    const charCodeZ = 'z'.charCodeAt(0);
    return getValidRows(input).map(row => {
      let shiftAmount = row.sectorNum % 26;
      return row.sectorNum + ' - ' + Array.from(row.roomCode).map(letter => {
        if (letter === ' ') {
          return letter;
        }
        let newCode = letter.charCodeAt(0) + shiftAmount;
        if (newCode > charCodeZ) {
          newCode = newCode - 26;
        }
        return String.fromCharCode(newCode);
      }).join('');
    }).filter(a => a.indexOf('northpole object storage') !== -1);
  }

];
