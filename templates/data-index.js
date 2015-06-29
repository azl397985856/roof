'use strict';

function zipObject(keys, values) {
  let output = {};
  for (let i in keys) {
    output[keys[i]] = values[i];
  }
  return output;
}

let dataNames = require('../roof.json').modules.data;
let dataModules = zipObject(dataNames, dataNames.map(function(dataName) {
  return require('./' + dataName);
}));

module.exports = require('roof/lib/data')(dataModules);
