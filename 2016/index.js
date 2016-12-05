'use strict';

let fs = require('fs');

let day = parseInt(process.argv[2]);
let challenge = parseInt(process.argv[3]);

fs.readFile(`./input/${day}.txt`, 'utf8', function (err, data) {
  if (err) {
    return console.error(err);
  }
  let result = require(`./solutions/day${day}.js`)[challenge - 1](data);
  console.log('Result:', result);
});