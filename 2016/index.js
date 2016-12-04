'use strict';

let day = parseInt(process.argv[2]);
let challenge = parseInt(process.argv[3]);

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    // Run code on "chunk"
    let result = require(`./solutions/day${day}.js`)[challenge - 1](chunk);
    console.log('Result:', result);
  }
});