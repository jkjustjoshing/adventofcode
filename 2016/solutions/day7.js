'use strict';

let _ = require('lodash');

function getIpSections (input) {
  return input.trim().split('\n').map((row) => {
    let regexp = /((?:\[)?[a-z]+(?:\])?)/g,
        sections = [],
        nextMatch;
    while(nextMatch = regexp.exec(row)) {
      let hypernet = nextMatch[0].indexOf('[') === 0;
      let string = hypernet ? nextMatch[0].substring(1, nextMatch[0].length - 1) : nextMatch[0];
      sections.push({ string, hypernet });
    }
    return sections;
  });
}

function supportsTls (ip) {
  let hasAbba = false;
  for(let i = 0; i < ip.length; ++i) {
    let ipSection = ip[i].string;

    // Check for abba section
    for(let j = 0; j < ipSection.length - 3; ++j) {
      if (ipSection[j] == ipSection[j + 3] && ipSection[j + 1] == ipSection[j + 2] && ipSection[j] != ipSection[j + 1]) {
        // Is match
        if (ip[i].hypernet) {
          return false;
        }
        hasAbba = true;
        break;
      }
    }
  }

  return hasAbba;
}

function supportsSsl (ip) {
  let abas = [];
  ip.filter(ip => !ip.hypernet).map(ipSection => ipSection.string).map(ipString => {
    for(let j = 0; j < ipString.length - 2; ++j) {
      if (ipString[j] == ipString[j + 2] && ipString[j] != ipString[j + 1]) {
        abas.push(ipString.substr(j, 3));
      }
    }
  });

  if (!abas.length) {
    return false;
  }

  let babs = abas.map(aba => aba[1] + aba[0] + aba[1]);
  return ip.filter(ip => ip.hypernet).map(ipSection => ipSection.string).filter(ipString => {
    // Check for bab section
    return babs.find(bab => ipString.indexOf(bab) !== -1);
  }).length > 0;
}

module.exports = [
  // Challenge 1
  input => {
    return getIpSections(input).filter(supportsTls).length;
  },

  // Challenge 2
  input => {
    return getIpSections(input).filter(supportsSsl).length;
  }

];
