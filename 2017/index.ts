let fs = require('fs');

let day = parseInt(process.argv[2]);
let challenge = parseInt(process.argv[3]);

fs.readFile(`./input/${day}.txt`, 'utf8', function (err, data) {
  if (err) {
    return console.error(err);
  }
  let source = require(`./solutions/day${day}.ts`);
  let result = (source.default ? source.default : source)[challenge - 1](data);
  console.log('Result:', result);
});
