let fs = require('fs');
let filedata = fs.readFileSync('md5.js','utf8');
eval(filedata);

module.exports = [
  // Challenge 1
  input => {
    let code = '';
    let index = 0;
    while(code.length < 8) {
      let hash = md5(input + index);
      if (hash.indexOf('00000') === 0) {
        // Found letter!
        code += hash[5];
        console.log('Found character ' + code.length);
      }
      index++;
      if (index % 1000 === 0) {
        console.log('Index ' + index);
      }
    }
    return code;
  },

  // Challenge 2
  input => {
    let code = '________';
    let numberFound = 0;
    let rangeIndex = 0;
    let indexRanges = [
      [2500000, 2510000],
      [7400000, 7430000],
      [7730000, 7740000],
      [9190000, 9200000],
      [14460000, 14470000],
      [16500000, 16510000],
      [17580000, 17590000],
      [25370000, 25380000],
    ];
    let index = indexRanges[rangeIndex][0];
    while(numberFound < 8) {
      let hash = md5(input + index);
      if (hash.substr(0, 5) === '00000') {
        // Found letter maybe
        let position = parseInt(hash[5]);
        if (!isNaN(position) && position < 8 && code[position] === '_') {
          code = Array.from(code).map((item, index) => index === position ? hash[6] : item).join('');
          numberFound++;
          console.log('Found character ' + numberFound + ' - ' + code + ' - ' + hash);
        }
      }
      index++;
      if (index > indexRanges[rangeIndex][1]) {
        rangeIndex++;
        index = indexRanges[rangeIndex][0];
      }
      if (index % 100000 === 0) {
        console.log('Index ' + index);
      }
    }
    return code;
  }

];
